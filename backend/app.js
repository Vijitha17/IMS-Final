const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// Import routes
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const stockRoutes = require('./routes/stockRoutes');
const requestRoutes = require('./routes/requestRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/requests', requestRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('IMS Backend Running...');
});

// Database connection and server start
sequelize.sync()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch((err) => console.error('❌ Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
