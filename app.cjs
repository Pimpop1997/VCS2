const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Database simulation (for Railway deployment without external DB)
const mockDatabase = {
  users: [
    { id: 1, username: 'admin', role: 'admin', status: 'active' },
    { id: 2, username: 'demo', role: 'user', status: 'active' }
  ],
  stats: {
    totalUsers: 2,
    onlineUsers: 1,
    totalCredits: "5000.00",
    todayTransactions: 0
  }
};

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-Id');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check endpoint
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      port: PORT,
      environment: 'Railway Production'
    }));
    return;
  }

  // API endpoints
  if (pathname === '/api/admin/dashboard-stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockDatabase.stats));
    return;
  }

  if (pathname === '/api/auth/login') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body);
          if (username === 'admin' && password === 'admin123') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              sessionId: 'railway-session-' + Date.now(),
              user: { username: 'admin', role: 'admin' }
            }));
          } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
        }
      });
      return;
    }
  }

  if (pathname === '/api/admin/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockDatabase.users));
    return;
  }

  // Main admin panel page
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BergDotBet Admin Panel - Railway</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Sukhumvit Set', -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-lg mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 class="text-3xl font-bold text-center mb-4 text-blue-600">BergDotBet Admin Panel</h1>
                <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p class="text-green-800 text-center font-semibold">✅ Railway Deployment Successful</p>
                    <p class="text-green-600 text-center text-sm mt-1">Server running on port ${PORT}</p>
                </div>
            </div>

            <!-- Login Section -->
            <div id="login-section" class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">Admin Login</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input type="text" id="username" value="admin" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" value="admin123" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    </div>
                    <button onclick="performLogin()" 
                            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                        เข้าสู่ระบบ (Login)
                    </button>
                </div>
            </div>

            <!-- Dashboard Section -->
            <div id="dashboard-section" class="bg-white rounded-lg shadow-lg p-6 mb-6 hidden">
                <h2 class="text-xl font-semibold mb-4">Dashboard</h2>
                <div id="dashboard-stats" class="grid grid-cols-2 gap-4 mb-4">
                    <!-- Stats will be loaded here -->
                </div>
                <button onclick="logout()" 
                        class="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                    ออกจากระบบ (Logout)
                </button>
            </div>

            <!-- Test Section -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">System Tests</h2>
                <div class="space-y-3">
                    <button onclick="testHealth()" 
                            class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                        Test Health Check
                    </button>
                    <button onclick="testAPI()" 
                            class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200">
                        Test API Endpoints
                    </button>
                    <button onclick="loadUsers()" 
                            class="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
                        Load User List
                    </button>
                </div>
                
                <div id="test-results" class="mt-4 hidden">
                    <h3 class="font-semibold mb-2">Test Results:</h3>
                    <div id="test-output" class="bg-gray-50 p-3 rounded border text-sm max-h-40 overflow-y-auto"></div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-6 text-sm text-gray-500">
                <p>BergDotBet Admin Panel v1.0</p>
                <p>Railway Deployment: <span class="text-green-600">Active</span></p>
                <p class="mt-2">
                    <a href="/health" target="_blank" class="text-blue-500 hover:underline">Health Check</a> |
                    <a href="/api/admin/dashboard-stats" target="_blank" class="text-blue-500 hover:underline">API Test</a>
                </p>
            </div>
        </div>
    </div>

    <script>
        let currentSession = null;

        async function performLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    currentSession = data.sessionId;
                    document.getElementById('login-section').classList.add('hidden');
                    document.getElementById('dashboard-section').classList.remove('hidden');
                    loadDashboardStats();
                    showTestResult('Login successful! Welcome, ' + data.user.username, 'success');
                } else {
                    showTestResult('Login failed: ' + data.message, 'error');
                }
            } catch (error) {
                showTestResult('Login error: ' + error.message, 'error');
            }
        }

        async function loadDashboardStats() {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const stats = await response.json();
                
                document.getElementById('dashboard-stats').innerHTML = 
                    '<div class="bg-blue-50 p-3 rounded text-center">' +
                    '<div class="text-2xl font-bold text-blue-600">' + stats.totalUsers + '</div>' +
                    '<div class="text-sm text-blue-800">Total Users</div>' +
                    '</div>' +
                    '<div class="bg-green-50 p-3 rounded text-center">' +
                    '<div class="text-2xl font-bold text-green-600">' + stats.onlineUsers + '</div>' +
                    '<div class="text-sm text-green-800">Online Users</div>' +
                    '</div>' +
                    '<div class="bg-yellow-50 p-3 rounded text-center">' +
                    '<div class="text-2xl font-bold text-yellow-600">' + stats.totalCredits + '</div>' +
                    '<div class="text-sm text-yellow-800">Total Credits (THB)</div>' +
                    '</div>' +
                    '<div class="bg-purple-50 p-3 rounded text-center">' +
                    '<div class="text-2xl font-bold text-purple-600">' + stats.todayTransactions + '</div>' +
                    '<div class="text-sm text-purple-800">Today Transactions</div>' +
                    '</div>';
            } catch (error) {
                showTestResult('Dashboard load error: ' + error.message, 'error');
            }
        }

        function logout() {
            currentSession = null;
            document.getElementById('login-section').classList.remove('hidden');
            document.getElementById('dashboard-section').classList.add('hidden');
            showTestResult('Logged out successfully', 'success');
        }

        async function testHealth() {
            try {
                const response = await fetch('/health');
                const data = await response.json();
                showTestResult('Health Check: ' + JSON.stringify(data, null, 2), 'success');
            } catch (error) {
                showTestResult('Health Check Error: ' + error.message, 'error');
            }
        }

        async function testAPI() {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const data = await response.json();
                showTestResult('API Test: ' + JSON.stringify(data, null, 2), 'success');
            } catch (error) {
                showTestResult('API Test Error: ' + error.message, 'error');
            }
        }

        async function loadUsers() {
            try {
                const response = await fetch('/api/admin/users');
                const data = await response.json();
                showTestResult('Users: ' + JSON.stringify(data, null, 2), 'success');
            } catch (error) {
                showTestResult('Users Load Error: ' + error.message, 'error');
            }
        }

        function showTestResult(message, type) {
            const output = document.getElementById('test-output');
            const results = document.getElementById('test-results');
            
            const timestamp = new Date().toLocaleTimeString();
            const color = type === 'success' ? 'text-green-600' : 'text-red-600';
            
            output.innerHTML = '<div class="' + color + '">[' + timestamp + '] ' + message + '</div>' + output.innerHTML;
            results.classList.remove('hidden');
        }
    </script>
</body>
</html>`);
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Not Found', 
    path: pathname,
    availableEndpoints: ['/', '/health', '/api/admin/dashboard-stats', '/api/auth/login', '/api/admin/users']
  }));
}

const server = http.createServer(handleRequest);

server.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('🚀 BergDotBet Admin Panel Started Successfully');
  console.log('='.repeat(60));
  console.log(`📡 Server: http://0.0.0.0:${PORT}`);
  console.log(`🌐 Railway: https://rmt-production.up.railway.app`);
  console.log(`❤️  Health: ${PORT === 3000 ? 'http://localhost:3000' : 'https://rmt-production.up.railway.app'}/health`);
  console.log(`👤 Admin: admin / admin123`);
  console.log('='.repeat(60));
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});