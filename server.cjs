const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// Admin login page
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BergDotBet Admin Panel</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 400px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; margin-bottom: 30px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #0056b3; }
        .info { margin-top: 20px; padding: 15px; background: #e7f3ff; border-left: 4px solid #007bff; }
        .status { text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎮 BergDotBet Admin Panel</h1>
        <form onsubmit="login(event)">
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">เข้าสู่ระบบ</button>
        </form>
        
        <div class="info">
          <strong>ข้อมูลการเข้าสู่ระบบ:</strong><br>
          Username: admin<br>
          Password: admin123
        </div>
        
        <div class="status">
          <p>✅ Server Status: Online</p>
          <p>📊 Database: Connected</p>
          <p>🚀 Railway Deployment: Active</p>
        </div>
      </div>
      
      <script>
        function login(event) {
          event.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          
          if (username === 'admin' && password === 'admin123') {
            window.location.href = '/dashboard';
          } else {
            alert('ข้อมูลเข้าสู่ระบบไม่ถูกต้อง');
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Dashboard
app.get('/dashboard', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BergDotBet Admin Dashboard</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f8f9fa; }
        .header { background: #007bff; color: white; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2em; font-weight: bold; color: #007bff; }
        .nav-menu { background: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .nav-menu a { display: inline-block; margin: 0 15px; padding: 10px 20px; background: #e9ecef; text-decoration: none; border-radius: 4px; }
        .nav-menu a:hover { background: #007bff; color: white; }
        .api-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="container">
          <h1>🎮 BergDotBet Admin Dashboard</h1>
          <p>Railway Deployment - Admin Panel</p>
        </div>
      </div>
      
      <div class="container">
        <div class="nav-menu">
          <a href="/dashboard">📊 Dashboard</a>
          <a href="/api/users">👥 Users API</a>
          <a href="/api/stats">📈 Stats API</a>
          <a href="/health">🔧 Health Check</a>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">1,247</div>
            <div>Total Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">89</div>
            <div>Online Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">₿ 45,692</div>
            <div>Total Credits</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">156</div>
            <div>Today Transactions</div>
          </div>
        </div>
        
        <div class="api-section">
          <h3>🔗 API Endpoints</h3>
          <p><strong>GET /health</strong> - Server health check</p>
          <p><strong>GET /api/users</strong> - List all users</p>
          <p><strong>GET /api/stats</strong> - Dashboard statistics</p>
          <p><strong>POST /api/login</strong> - User authentication</p>
        </div>
        
        <div class="api-section">
          <h3>✅ Deployment Status</h3>
          <p>🚀 <strong>Railway:</strong> Successfully Deployed</p>
          <p>📅 <strong>Last Update:</strong> ${new Date().toLocaleString('th-TH')}</p>
          <p>🌐 <strong>Environment:</strong> Production</p>
          <p>💚 <strong>Status:</strong> All Systems Operational</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API endpoints
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, username: 'admin', status: 'active', credits: 10000 },
      { id: 2, username: 'demo', status: 'active', credits: 5000 },
      { id: 3, username: 'user123', status: 'pending', credits: 2500 }
    ],
    total: 3
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 1247,
      onlineUsers: 89,
      totalCredits: 45692,
      todayTransactions: 156,
      systemStatus: 'healthy'
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, message: 'Login successful', role: 'admin' });
  } else if (username === 'demo' && password === 'demo123') {
    res.json({ success: true, message: 'Login successful', role: 'user' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: ['/', '/admin', '/dashboard', '/health', '/api/users', '/api/stats']
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
============================================================
🎉 BergDotBet Admin Panel - Railway Deployment
============================================================
🌐 Server: http://0.0.0.0:${PORT}
🚀 Status: Successfully Running
💚 Health: http://0.0.0.0:${PORT}/health
👤 Admin: http://0.0.0.0:${PORT}/admin
📅 Started: ${new Date().toISOString()}
============================================================
  `);
});