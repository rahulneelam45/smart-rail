const express = require('express');
const router = express.Router();

const bookings = [];

// Create booking
router.post('/', (req, res) => {
    const { trainNumber, passengers, travelClass, journeyDate } = req.body;
    
    const booking = {
        bookingId: 'SRL' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        trainNumber,
        passengers,
        travelClass,
        journeyDate,
        status: 'Confirmed',
        createdAt: new Date()
    };
    
    bookings.push(booking);
    res.json(booking);
});

// Get user bookings
router.get('/', (req, res) => {
    res.json(bookings);
});

// Get booking details
router.get('/:bookingId', (req, res) => {
    const booking = bookings.find(b => b.bookingId === req.params.bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
});

module.exports = router;
