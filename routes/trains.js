const express = require('express');
const router = express.Router();

// Mock train database
const trains = [
    { number: '12001', name: 'Rajdhani Express', from: 'New Delhi', to: 'Mumbai', departure: '22:15', arrival: '08:15' },
    { number: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Agra', departure: '06:00', arrival: '08:15' },
    { number: '12269', name: 'Pune Shatabdi', from: 'New Delhi', to: 'Pune', departure: '16:40', arrival: '05:00' },
];

// Get all trains
router.get('/', (req, res) => {
    res.json(trains);
});

// Search trains by route
router.get('/search', (req, res) => {
    const { from, to } = req.query;
    const results = trains.filter(train => 
        train.from.toLowerCase().includes(from?.toLowerCase() || '') &&
        train.to.toLowerCase().includes(to?.toLowerCase() || '')
    );
    res.json(results);
});

// Get train details
router.get('/:trainNumber', (req, res) => {
    const train = trains.find(t => t.number === req.params.trainNumber);
    if (!train) return res.status(404).json({ error: 'Train not found' });
    res.json(train);
});

module.exports = router;
