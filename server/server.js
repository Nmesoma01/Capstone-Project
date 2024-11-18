const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this frontend
  credentials: true, // Allow credentials such as cookies, authorization headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
// Logout Route
app.post('/auth/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.json({ message: 'Successfully logged out' });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.post('/api/mentorship-form', async (req, res) => {
  try {
    const MentorshipForm = require('./models/Mentorship'); // Corrected the casing of the model name
    const formData = req.body;

    // Create new mentorship form entry
    const newMentorship = new MentorshipForm({
      ...formData,
      // Remove the user field requirement since we're not using auth
      danceStyle: formData.danceStyle || 'Traditional', // Provide a default value
    });

    await newMentorship.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully!' 
    });
  } catch (error) {
    console.error('Error saving mentorship form:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit form',
      details: error.message 
    });
  }
});

// Dashboard Route (Protected)
app.get('/dashboard', (req, res) => {
  res.send('Welcome to the dashboard');
});

// Profile Update Page
app.get('/profile', (req, res) => {
  res.send('Profile Update Page');
});

// Mentorship Form Page
app.get('/mentorship-form', (req, res) => {
  res.send('Mentorship Form Page');
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Server Error');
});

// Listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));