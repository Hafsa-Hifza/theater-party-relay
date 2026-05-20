const express = require('express');
const Gun = require('gun');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8765;

// CORS enable for frontend access
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Gun static files serve
app.use(Gun.serve);

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: '🔫 GunDB Relay Server is Running!',
    gun_endpoint: '/gun'
  });
});

const server = app.listen(port, () => {
  console.log('✅ GunDB Relay running on port ' + port);
});

// Initialize Gun with the server
Gun({ 
  web: server,
  file: 'data'
});
