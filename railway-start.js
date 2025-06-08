import express from 'express';
import { createServer } from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API endpoints
app.get('/api/admin/dashboard-stats', (req, res) => {
  res.json({
    totalUsers: 2,
    onlineUsers: 1,
    totalCredits: "5000.00",
    todayTransactions: 0
  });
});

// Root endpoint with admin panel
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
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
<body class="bg-gray-100 min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-600">BergDotBet Admin Panel</h1>
      <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded">
        <p class="text-green-800 text-center">Railway Deployment Success!</p>
      </div>
      
      <div id="login-form">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input type="text" id="username" value="admin" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" value="admin123" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <button onclick="testLogin()" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-4">
          Test Login
        </button>
        <button onclick="loadStats()" class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Load System Stats
        </button>
      </div>
      
      <div id="stats-container" class="mt-6 hidden">
        <h3 class="font-semibold mb-2">System Statistics:</h3>
        <div id="stats" class="bg-gray-50 p-4 rounded"></div>
      </div>
      
      <div class="mt-6 text-center text-sm text-gray-500">
        <p>Connect DATABASE_URL for full system functionality</p>
      </div>
    </div>
  </div>
  
  <script>
    function testLogin() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (username === 'admin' && password === 'admin123') {
        alert('Login credentials correct! Railway deployment working');
        loadStats();
      } else {
        alert('Invalid credentials');
      }
    }
    
    async function loadStats() {
      try {
        const response = await fetch('/api/admin/dashboard-stats');
        const stats = await response.json();
        
        document.getElementById('stats').innerHTML = 
          '<p><strong>Total Users:</strong> ' + stats.totalUsers + '</p>' +
          '<p><strong>Online Users:</strong> ' + stats.onlineUsers + '</p>' +
          '<p><strong>Total Credits:</strong> ' + stats.totalCredits + ' THB</p>' +
          '<p><strong>Today Transactions:</strong> ' + stats.todayTransactions + '</p>';
        
        document.getElementById('stats-container').classList.remove('hidden');
        alert('API endpoints working correctly!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  </script>
</body>
</html>
  `);
});

// Catch all other routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ message: 'API endpoint not found', path: req.path });
  } else {
    res.redirect('/');
  }
});

const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log('BergDotBet Admin Panel is running on http://0.0.0.0:' + PORT);
  console.log('Railway URL: https://rmt-production.up.railway.app');
});