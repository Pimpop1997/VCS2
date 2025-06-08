const http = require('http');
const url = require('url');

// Railway requires binding to 0.0.0.0 and using process.env.PORT
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

console.log('Starting Railway deployment...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);
console.log('Host:', HOST);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${new Date().toISOString()} - ${req.method} ${path}`);

  // Health check endpoint
  if (path === '/health' || path === '/health/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    }));
    return;
  }

  // API endpoint
  if (path === '/api/status' || path === '/api/status/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'BergDotBet API is running',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Dashboard stats
  if (path === '/api/admin/dashboard-stats' || path === '/api/admin/dashboard-stats/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      totalUsers: 2,
      onlineUsers: 1,
      totalCredits: "5000.00",
      todayTransactions: 0,
      serverStatus: 'Railway Active'
    }));
    return;
  }

  // Root path - Admin panel
  if (path === '/' || path === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BergDotBet Admin Panel</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            padding: 30px;
        }
        h1 { 
            text-align: center; 
            color: #333; 
            margin-bottom: 30px;
            font-size: 2.2em;
        }
        .status {
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 30px;
            font-weight: bold;
        }
        .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .section h3 {
            color: #333;
            margin-bottom: 15px;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
            transition: background 0.3s;
        }
        button:hover { background: #0056b3; }
        .success { background: #28a745; }
        .success:hover { background: #1e7e34; }
        .warning { background: #ffc107; color: #333; }
        .warning:hover { background: #e0a800; }
        input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .result {
            margin-top: 15px;
            padding: 15px;
            background: #e9ecef;
            border-radius: 5px;
            border-left: 4px solid #17a2b8;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 14px;
            max-height: 200px;
            overflow-y: auto;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #007bff;
        }
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 BergDotBet Admin Panel</h1>
        
        <div class="status">
            ✅ Railway Deployment Successfully Running on Port ${PORT}
        </div>

        <div class="section">
            <h3>🔐 Admin Login</h3>
            <input type="text" id="username" placeholder="Username" value="admin">
            <input type="password" id="password" placeholder="Password" value="admin123">
            <button onclick="performLogin()" class="success">Login to Dashboard</button>
        </div>

        <div class="section">
            <h3>🔧 System Tests</h3>
            <button onclick="testHealth()">Health Check</button>
            <button onclick="testAPI()" class="success">API Status</button>
            <button onclick="loadDashboard()" class="warning">Load Dashboard</button>
            <div id="testResult" class="result" style="display:none;"></div>
        </div>

        <div class="section" id="dashboardSection" style="display:none;">
            <h3>📊 Dashboard Statistics</h3>
            <div class="grid" id="statsGrid">
                <!-- Stats will be loaded here -->
            </div>
        </div>

        <div class="section">
            <h3>ℹ️ Server Information</h3>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p><strong>Port:</strong> ${PORT}</p>
            <p><strong>Host:</strong> ${HOST}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Railway URL:</strong> <a href="https://rmt-production.up.railway.app" target="_blank">https://rmt-production.up.railway.app</a></p>
        </div>
    </div>

    <script>
        function showResult(message, success = true) {
            const result = document.getElementById('testResult');
            result.style.display = 'block';
            result.textContent = new Date().toLocaleTimeString() + ': ' + message;
            result.style.borderLeftColor = success ? '#28a745' : '#dc3545';
        }

        async function testHealth() {
            try {
                const response = await fetch('/health');
                const data = await response.json();
                showResult('Health Check: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                showResult('Health Check Error: ' + error.message, false);
            }
        }

        async function testAPI() {
            try {
                const response = await fetch('/api/status');
                const data = await response.json();
                showResult('API Test: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                showResult('API Error: ' + error.message, false);
            }
        }

        async function loadDashboard() {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const data = await response.json();
                
                document.getElementById('statsGrid').innerHTML = 
                    '<div class="stat-card"><div class="stat-number">' + data.totalUsers + '</div><div class="stat-label">Total Users</div></div>' +
                    '<div class="stat-card"><div class="stat-number">' + data.onlineUsers + '</div><div class="stat-label">Online Users</div></div>' +
                    '<div class="stat-card"><div class="stat-number">' + data.totalCredits + '</div><div class="stat-label">Total Credits (THB)</div></div>' +
                    '<div class="stat-card"><div class="stat-number">' + data.todayTransactions + '</div><div class="stat-label">Today Transactions</div></div>';
                
                document.getElementById('dashboardSection').style.display = 'block';
                showResult('Dashboard loaded successfully');
            } catch (error) {
                showResult('Dashboard Error: ' + error.message, false);
            }
        }

        function performLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                showResult('Login successful! Welcome to BergDotBet Admin Panel');
                loadDashboard();
            } else {
                showResult('Login failed: Invalid credentials', false);
            }
        }

        // Auto-test on load
        setTimeout(() => {
            testHealth();
        }, 1000);
    </script>
</body>
</html>`);
    return;
  }

  // 404 for any other path
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not Found',
    path: path,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      '/',
      '/health',
      '/api/status',
      '/api/admin/dashboard-stats'
    ]
  }));
});

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Start server
server.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🎉 BergDotBet Admin Panel Started Successfully!');
  console.log('='.repeat(60));
  console.log(`🌐 Server URL: http://${HOST}:${PORT}`);
  console.log(`🚀 Railway URL: https://rmt-production.up.railway.app`);
  console.log(`💚 Health Check: http://${HOST}:${PORT}/health`);
  console.log(`👤 Admin Credentials: admin / admin123`);
  console.log(`📅 Started: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});