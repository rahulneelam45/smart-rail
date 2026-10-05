const express = require('express');
const router = express.Router();

// Mock historical data
const trainHistory = {
    '12001': [{ delay: 5, date: '2024-10-01' }, { delay: 8, date: '2024-10-02' }, { delay: 3, date: '2024-10-03' }],
    '12002': [{ delay: 2, date: '2024-10-01' }, { delay: 1, date: '2024-10-02' }, { delay: 0, date: '2024-10-03' }],
    '12269': [{ delay: 15, date: '2024-10-01' }, { delay: 12, date: '2024-10-02' }, { delay: 10, date: '2024-10-03' }],
};

// Predict delay
router.get('/delay/:trainNumber', (req, res) => {
    const { trainNumber } = req.params;
    const history = trainHistory[trainNumber] || [];
    
    if (history.length === 0) {
        return res.json({ trainNumber, predictedDelay: 0, confidence: 0 });
    }
    
    const avgDelay = history.reduce((sum, h) => sum + h.delay, 0) / history.length;
    const confidence = Math.min(100, (history.length / 10) * 100);
    
    res.json({
        trainNumber,
        predictedDelay: Math.round(avgDelay),
        confidence: Math.round(confidence),
        history
    });
});

// Compare trains
router.post('/compare', (req, res) => {
    const { trainNumbers } = req.body;
    
    const comparison = trainNumbers.map(trainNumber => {
        const history = trainHistory[trainNumber] || [];
        const avgDelay = history.length > 0 
            ? history.reduce((sum, h) => sum + h.delay, 0) / history.length 
            : 0;
        
        return {
            trainNumber,
            avgDelay: Math.round(avgDelay),
            reliability: 100 - Math.round(avgDelay),
            dataPoints: history.length
        };
    });
    
    res.json(comparison);
});

module.exports = router;
