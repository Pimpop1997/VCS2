const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      port: PORT
    }));
    return;
  }

  // API endpoint
  if (req.url === '/api/admin/dashboard-stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      totalUsers: 2,
      onlineUsers: 1,
      totalCredits: "5000.00",
      todayTransactions: 0
    }));
    return;
  }

  // Main page
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BergDotBet Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-center mb-6 text-blue-600">BergDotBet Admin Panel</h1>
            
            <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                <p class="text-green-800 text-center text-sm">Railway Deployment Active</p>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input type="text" id="username" value="admin" class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
                </div>
                
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input type="password" id="password" value="admin123" class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
                </div>
                
                <button onclick="testAPI()" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Test API Connection
                </button>
            </div>
            
            <div id="result" class="mt-4 hidden">
                <h3 class="font-bold mb-2">Result:</h3>
                <div id="output" class="bg-gray-50 p-3 rounded text-sm"></div>
            </div>
        </div>
    </div>

    <script>
        async function testAPI() {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const data = await response.json();
                
                document.getElementById('output').innerHTML = 
                    'API Status: WORKING<br>' +
                    'Total Users: ' + data.totalUsers + '<br>' +
                    'Online Users: ' + data.onlineUsers + '<br>' +
                    'Total Credits: ' + data.totalCredits + ' THB<br>' +
                    'Today Transactions: ' + data.todayTransactions;
                
                document.getElementById('result').classList.remove('hidden');
                
            } catch (error) {
                document.getElementById('output').innerHTML = 'Error: ' + error.message;
                document.getElementById('result').classList.remove('hidden');
            }
        }
    </script>
</body>
</html>`);
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not Found', path: req.url }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('BergDotBet Admin Panel running on port ' + PORT);
  console.log('Railway URL: https://rmt-production.up.railway.app');
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Error:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Rejection:', reason);
});