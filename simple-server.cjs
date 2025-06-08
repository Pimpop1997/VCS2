const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS headers for Railway
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT,
    env: process.env.NODE_ENV || 'development'
  });
});

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    message: 'BergDotBet API is running',
    timestamp: new Date().toISOString(),
    environment: 'Railway Production'
  });
});

// Dashboard stats endpoint
app.get('/api/admin/dashboard-stats', (req, res) => {
  res.json({
    totalUsers: 2,
    onlineUsers: 1,
    totalCredits: "5000.00",
    todayTransactions: 0,
    status: 'Railway deployment active'
  });
});

// Root route
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BergDotBet Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">BergDotBet Admin Panel</h1>
            
            <div class="mb-6 p-4 bg-green-100 border border-green-400 rounded">
                <p class="text-green-700 text-center font-semibold">Railway Deployment Successful!</p>
                <p class="text-green-600 text-center text-sm mt-2">Server is running on port ${PORT}</p>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-bold mb-2">Username:</label>
                    <input type="text" id="username" value="admin" class="w-full px-3 py-2 border rounded-lg">
                </div>
                
                <div>
                    <label class="block text-gray-700 font-bold mb-2">Password:</label>
                    <input type="password" id="password" value="admin123" class="w-full px-3 py-2 border rounded-lg">
                </div>
                
                <button onclick="testConnection()" class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                    Test Connection
                </button>
                
                <button onclick="loadDashboard()" class="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                    Load Dashboard Stats
                </button>
            </div>
            
            <div id="results" class="mt-6 hidden">
                <h3 class="font-bold mb-3">Test Results:</h3>
                <div id="output" class="bg-gray-50 p-4 rounded border"></div>
            </div>
            
            <div class="mt-6 text-center text-sm text-gray-500">
                <p>Railway URL: https://rmt-production.up.railway.app</p>
                <p>For full system, connect DATABASE_URL</p>
            </div>
        </div>
    </div>

    <script>
        async function testConnection() {
            try {
                const response = await fetch('/api/status');
                const data = await response.json();
                
                document.getElementById('output').innerHTML = 
                    '<div class="text-green-600">' +
                    '<p><strong>Connection Status:</strong> SUCCESS</p>' +
                    '<p><strong>Message:</strong> ' + data.message + '</p>' +
                    '<p><strong>Environment:</strong> ' + data.environment + '</p>' +
                    '<p><strong>Timestamp:</strong> ' + data.timestamp + '</p>' +
                    '</div>';
                
                document.getElementById('results').classList.remove('hidden');
                
            } catch (error) {
                document.getElementById('output').innerHTML = 
                    '<div class="text-red-600">' +
                    '<p><strong>Error:</strong> ' + error.message + '</p>' +
                    '</div>';
                document.getElementById('results').classList.remove('hidden');
            }
        }
        
        async function loadDashboard() {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const stats = await response.json();
                
                document.getElementById('output').innerHTML = 
                    '<div class="text-blue-600">' +
                    '<p><strong>Dashboard Stats:</strong></p>' +
                    '<p>Total Users: ' + stats.totalUsers + '</p>' +
                    '<p>Online Users: ' + stats.onlineUsers + '</p>' +
                    '<p>Total Credits: ' + stats.totalCredits + ' THB</p>' +
                    '<p>Today Transactions: ' + stats.todayTransactions + '</p>' +
                    '<p>Status: ' + stats.status + '</p>' +
                    '</div>';
                
                document.getElementById('results').classList.remove('hidden');
                
            } catch (error) {
                document.getElementById('output').innerHTML = 
                    '<div class="text-red-600">' +
                    '<p><strong>Dashboard Error:</strong> ' + error.message + '</p>' +
                    '</div>';
                document.getElementById('results').classList.remove('hidden');
            }
        }
    </script>
</body>
</html>
  `);
});

// Catch all routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ 
      message: 'API endpoint not found', 
      path: req.path,
      availableEndpoints: ['/api/status', '/api/admin/dashboard-stats', '/health']
    });
  } else {
    res.redirect('/');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('BergDotBet Admin Panel Started');
  console.log('='.repeat(50));
  console.log('Server running on: http://0.0.0.0:' + PORT);
  console.log('Railway URL: https://rmt-production.up.railway.app');
  console.log('Health Check: /health');
  console.log('Admin Panel: /');
  console.log('='.repeat(50));
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});