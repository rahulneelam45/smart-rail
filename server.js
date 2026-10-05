const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import routes
const trainRoutes = require('./routes/trains');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const predictionRoutes = require('./routes/predictions');

// Use routes
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);

// Real-time train tracking
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('track_train', (trainNumber) => {
    console.log(`Tracking train: ${trainNumber}`);
    // Emit real-time location updates
    setInterval(() => {
      const mockLocation = {
        trainNumber,
        latitude: 28.7041 + (Math.random() - 0.5) * 0.1,
        longitude: 77.1025 + (Math.random() - 0.5) * 0.1,
        speed: Math.floor(Math.random() * 120),
        timestamp: new Date()
      };
      socket.emit('location_update', mockLocation);
    }, 5000);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Smart Rail Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
