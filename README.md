# 🚂 Smart Rail - AI-Powered Train Booking Platform

A revolutionary train booking website with real-time tracking, AI-powered delay prediction, and intelligent train recommendations.

## ✨ Features

### 🎫 **Easy Booking**
- Search trains by route and date
- Instant ticket confirmation
- Multiple class options (1A, 2A, 3A, SL, General)
- Secure payment integration ready

### 📍 **Real-Time Train Tracking**
- Live GPS tracking of your train
- Real-time location updates via WebSocket
- Current speed and status monitoring
- Interactive map visualization

### 🤖 **AI-Powered Delay Prediction**
- Predicts train delays based on historical data
- Analyzes past journey patterns
- Provides confidence scores
- Helps you plan better

### ❤️ **Saved Trains**
- Save favorite routes like Flipkart favorites
- Quick-book from saved trains
- Track saved journey history
- Personalized recommendations

### 🧠 **Smart Train Comparison**
- AI-powered train recommendations
- Compare by speed, price, and comfort
- See best options for your journey
- Data-driven suggestions

### 📊 **Analytics & Insights**
- Track booking history
- Journey analytics
- Loyalty rewards
- Personalized recommendations

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Real-time:** Socket.io
- **Database:** MongoDB (ready to integrate)
- **Authentication:** JWT, Bcryptjs
- **APIs:** IRCTC Integration Ready

## 📋 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/rahulneelam45/smart-rail.git
cd smart-rail

# Install dependencies
npm install

# Create .env file
echo "PORT=3000" > .env
echo "JWT_SECRET=your_secret_key" >> .env

# Start the server
npm start
```

Visit `http://localhost:3000` in your browser.

## 🚀 Usage

### Book a Train
1. Go to "Book Ticket" section
2. Enter departure and arrival stations
3. Select journey date and passengers
4. Choose travel class
5. View available trains
6. See AI-predicted delays
7. Click "Book" to confirm

### Track Your Train
1. Go to "Track Train" section
2. Enter your train number
3. Click "Track Now"
4. See real-time location on map
5. View current speed and status
6. Check predicted delay

### Save Trains
1. While searching trains, click ❤️ button
2. Access saved trains anytime
3. Quick-book from saved list
4. Get smart recommendations

## 📊 API Endpoints

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/search?from=X&to=Y` - Search trains
- `GET /api/trains/:trainNumber` - Get train details

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:bookingId` - Get booking details

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:userId` - Get user profile

### Predictions
- `GET /api/predictions/delay/:trainNumber` - Predict delay
- `POST /api/predictions/compare` - Compare trains

## 🔗 Integration with IRCTC

To integrate real government train schedules and data:

1. Get API credentials from IRCTC
2. Update `routes/trains.js` with live data
3. Implement real-time schedule updates
4. Add historical journey data for better predictions

## 📈 AI & ML Features

### Delay Prediction Algorithm
- Analyzes historical delays
- Considers seasonal patterns
- Factors in train type and route
- Provides confidence scores

### Train Recommendation Engine
- Compares multiple factors
- Optimizes for speed, price, comfort
- Learns user preferences
- Suggests best options

## 📱 Screenshots

- Home Page with features
- Booking interface
- Real-time tracking map
- Saved trains list
- User profile

## 🔒 Security

- JWT authentication
- Bcrypt password hashing
- CORS protection
- Input validation
- Rate limiting ready

## 📝 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS alerts for delays
- [ ] Seat availability calendar
- [ ] Cancellation and refunds
- [ ] Group bookings
- [ ] Loyalty program
- [ ] Machine learning model for predictions
- [ ] Integration with multiple train operators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support, email: support@smartrail.com

## 👨‍💻 Author

**Rahul Neelam**
- GitHub: [@rahulneelam45](https://github.com/rahulneelam45)
- Email: rahulneelam45@example.com

---

**Smart Rail** - Making Train Travel Smarter, Faster, and More Reliable! 🚂✨
