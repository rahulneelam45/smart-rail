// Socket IO Connection
const socket = io();

// Mock data
const mockTrains = [
    { number: '12001', name: 'Rajdhani Express', from: 'New Delhi', to: 'Mumbai', departure: '22:15', arrival: '08:15', duration: '10h', price: 2500, seats: 45 },
    { number: '12002', name: 'Shatabdi Express', from: 'New Delhi', to: 'Agra', departure: '06:00', arrival: '08:15', duration: '2h 15m', price: 800, seats: 60 },
    { number: '12269', name: 'Pune Shatabdi', from: 'New Delhi', to: 'Pune', departure: '16:40', arrival: '05:00', duration: '12h 20m', price: 1800, seats: 35 },
    { number: '12951', name: 'Mumbra Express', from: 'New Delhi', to: 'Mumbai', departure: '17:00', arrival: '08:00', duration: '15h', price: 1200, seats: 80 },
];

let savedTrains = [];
let currentBooking = null;

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
}

// Booking Form
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const journeyDate = document.getElementById('journeyDate').value;
    const passengers = document.getElementById('passengers').value;
    const travelClass = document.getElementById('class').value;
    
    // Filter trains
    const availableTrains = mockTrains.filter(train => 
        train.from.toLowerCase().includes(from.toLowerCase()) &&
        train.to.toLowerCase().includes(to.toLowerCase())
    );
    
    if (availableTrains.length > 0) {
        displayTrains(availableTrains, passengers, travelClass);
    } else {
        alert('No trains found for this route');
    }
});

function displayTrains(trains, passengers, travelClass) {
    const trainsList = document.getElementById('trainsList');
    trainsList.innerHTML = '';
    
    trains.forEach(train => {
        const trainCard = document.createElement('div');
        trainCard.className = 'train-card';
        
        // Predict delay
        const predictedDelay = predictTrainDelay(train.number);
        const delayText = predictedDelay > 0 ? `(Predicted delay: ${predictedDelay} min)` : '(On time)';
        
        trainCard.innerHTML = `
            <div class="train-info">
                <div class="train-name">${train.name} (${train.number})</div>
                <div class="train-route">${train.from} → ${train.to}</div>
                <div class="train-timing">${train.departure} - ${train.arrival} (${train.duration}) ${delayText}</div>
            </div>
            <div class="train-price">₹${train.price * passengers}</div>
            <button class="btn btn-success btn-small" onclick="bookTrain('${train.number}', '${train.name}', ${train.price}, ${passengers}, '${travelClass}')">Book</button>
            <button class="btn btn-secondary btn-small" onclick="saveTrain('${train.number}', '${train.name}', '${train.from}', '${train.to}')">❤️ Save</button>
        `;
        trainsList.appendChild(trainCard);
    });
    
    document.getElementById('trainsResults').style.display = 'block';
}

function predictTrainDelay(trainNumber) {
    // AI-based prediction using mock past data
    const delayProbabilities = {
        '12001': 5,
        '12002': 2,
        '12269': 8,
        '12951': 15
    };
    
    return delayProbabilities[trainNumber] || Math.floor(Math.random() * 20);
}

function bookTrain(trainNumber, trainName, price, passengers, travelClass) {
    currentBooking = {
        trainNumber,
        trainName,
        price,
        passengers,
        travelClass,
        bookingId: 'SRL' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString()
    };
    
    alert(`✅ Booking Confirmed!\n\nBooking ID: ${currentBooking.bookingId}\nTrain: ${trainName} (${trainNumber})\nPassengers: ${passengers}\nClass: ${travelClass}\nTotal Price: ₹${price * passengers}\n\nCheck your email for confirmation.`);
}

function saveTrain(trainNumber, trainName, from, to) {
    const train = { trainNumber, trainName, from, to, savedDate: new Date().toLocaleDateString() };
    
    if (!savedTrains.find(t => t.trainNumber === trainNumber)) {
        savedTrains.push(train);
        alert(`✅ ${trainName} added to saved trains!`);
    } else {
        alert('❌ This train is already saved!');
    }
    
    updateSavedTrainsList();
}

function updateSavedTrainsList() {
    const savedList = document.getElementById('savedTrainsList');
    
    if (savedTrains.length === 0) {
        savedList.innerHTML = '<div class="empty-message">No saved trains yet. Save your favorite routes!</div>';
        return;
    }
    
    savedList.innerHTML = '';
    savedTrains.forEach((train, index) => {
        const card = document.createElement('div');
        card.className = 'saved-train-card';
        card.innerHTML = `
            <div class="saved-train-info">
                <h3>${train.trainName} (${train.trainNumber})</h3>
                <p>${train.from} → ${train.to}</p>
                <p>Saved on: ${train.savedDate}</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-small" onclick="bookFromSaved(${index})">Book</button>
                <button class="btn btn-danger btn-small" onclick="removeSavedTrain(${index})">Remove</button>
            </div>
        `;
        savedList.appendChild(card);
    });
}

function bookFromSaved(index) {
    const train = savedTrains[index];
    document.getElementById('from').value = train.from;
    document.getElementById('to').value = train.to;
    showSection('booking');
}

function removeSavedTrain(index) {
    savedTrains.splice(index, 1);
    updateSavedTrainsList();
}

// Train Tracking
let currentTrainLocation = null;

function trackTrain() {
    const trainNumber = document.getElementById('trackTrainNumber').value;
    
    if (!trainNumber) {
        alert('Please enter a train number');
        return;
    }
    
    // Emit socket event
    socket.emit('track_train', trainNumber);
    
    // Show train details
    document.getElementById('trainDetails').style.display = 'block';
    document.getElementById('detailTrainNo').textContent = trainNumber;
    
    // Simulate real-time updates
    simulateTrainTracking(trainNumber);
}

socket.on('location_update', (data) => {
    currentTrainLocation = data;
    updateTrainOnMap(data);
});

function simulateTrainTracking(trainNumber) {
    setInterval(() => {
        const lat = 28.7041 + (Math.random() - 0.5) * 0.2;
        const lon = 77.1025 + (Math.random() - 0.5) * 0.2;
        const speed = Math.floor(Math.random() * 120);
        const delay = predictTrainDelay(trainNumber);
        
        document.getElementById('detailLocation').textContent = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
        document.getElementById('detailSpeed').textContent = `${speed} km/h`;
        document.getElementById('detailDelay').textContent = `${delay} minutes`;
    }, 5000);
}

function updateTrainOnMap(data) {
    const canvas = document.getElementById('mapCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Draw train location
    const x = (data.longitude + 180) / 360 * canvas.width;
    const y = (90 - data.latitude) / 180 * canvas.height;
    
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw train icon
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚂', x, y);
    
    // Draw info
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Train ${data.trainNumber}`, x, y + 30);
}

// Initialize
window.addEventListener('load', () => {
    showSection('home');
    updateSavedTrainsList();
});

// AI Train Comparison
function compareTrains() {
    const trains = mockTrains;
    
    let bestTrainByTime = trains.reduce((best, train) => {
        const bestTime = parseFloat(best.duration);
        const trainTime = parseFloat(train.duration);
        return trainTime < bestTime ? train : best;
    });
    
    let bestTrainByPrice = trains.reduce((best, train) => {
        return train.price < best.price ? train : best;
    });
    
    let bestTrainByComfort = trains.reduce((best, train) => {
        const score = (100 - train.price / 100) + (train.seats / 100);
        const bestScore = (100 - best.price / 100) + (best.seats / 100);
        return score > bestScore ? train : best;
    });
    
    return {
        fastest: bestTrainByTime,
        cheapest: bestTrainByPrice,
        mostComfortable: bestTrainByComfort
    };
}

console.log('🚂 Smart Rail App Loaded Successfully!');
