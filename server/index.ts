import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize database with sample data
  if ("initializeData" in storage) {
    await (storage as any).initializeData();
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // สำหรับ Railway และ production - serve basic frontend
    app.use(express.static("dist"));
    app.use(express.static("public"));
    
    // Serve frontend สำหรับ routes ที่ไม่ใช่ API
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) return;
      
      // ส่ง basic HTML page สำหรับ admin panel
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BergDotBet Admin Panel</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: 'Sukhumvit Set', -apple-system, BlinkMacSystemFont, sans-serif; }
          </style>
        </head>
        <body class="bg-gray-100 min-h-screen">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
              <h1 class="text-2xl font-bold text-center mb-6">BergDotBet Admin Panel</h1>
              <div id="login-form">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                  <input type="text" id="username" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="admin">
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input type="password" id="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="admin123">
                </div>
                <button onclick="login()" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">เข้าสู่ระบบ</button>
              </div>
              <div id="dashboard" style="display:none;">
                <h2 class="text-xl font-bold mb-4">Dashboard</h2>
                <div class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded">
                    <h3 class="font-semibold">สถิติระบบ</h3>
                    <div id="stats"></div>
                  </div>
                  <button onclick="logout()" class="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">ออกจากระบบ</button>
                </div>
              </div>
            </div>
          </div>
          
          <script>
            let sessionId = localStorage.getItem('sessionId');
            
            if (sessionId) {
              checkAuth();
            }
            
            async function login() {
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              
              try {
                const response = await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  sessionId = data.sessionId;
                  localStorage.setItem('sessionId', sessionId);
                  showDashboard();
                  loadStats();
                } else {
                  alert('เข้าสู่ระบบไม่สำเร็จ: ' + data.message);
                }
              } catch (error) {
                alert('เกิดข้อผิดพลาด: ' + error.message);
              }
            }
            
            async function checkAuth() {
              try {
                const response = await fetch('/api/auth/me', {
                  headers: { 'X-Session-Id': sessionId }
                });
                
                if (response.ok) {
                  showDashboard();
                  loadStats();
                } else {
                  localStorage.removeItem('sessionId');
                  sessionId = null;
                }
              } catch (error) {
                console.error('Auth check failed:', error);
              }
            }
            
            async function loadStats() {
              try {
                const response = await fetch('/api/admin/dashboard-stats');
                const stats = await response.json();
                
                document.getElementById('stats').innerHTML = \`
                  <p>ผู้ใช้ทั้งหมด: \${stats.totalUsers || 0}</p>
                  <p>ผู้ใช้ออนไลน์: \${stats.onlineUsers || 0}</p>
                  <p>เครดิตรวม: \${stats.totalCredits || 0} บาท</p>
                  <p>ธุรกรรมวันนี้: \${stats.todayTransactions || 0}</p>
                \`;
              } catch (error) {
                document.getElementById('stats').innerHTML = '<p class="text-red-500">ไม่สามารถโหลดข้อมูลได้</p>';
              }
            }
            
            function showDashboard() {
              document.getElementById('login-form').style.display = 'none';
              document.getElementById('dashboard').style.display = 'block';
            }
            
            function logout() {
              localStorage.removeItem('sessionId');
              sessionId = null;
              document.getElementById('login-form').style.display = 'block';
              document.getElementById('dashboard').style.display = 'none';
            }
          </script>
        </body>
        </html>
      `);
    });
  }
})();

export default app;
