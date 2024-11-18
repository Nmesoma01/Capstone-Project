const mongoose = require('mongoose');

const MentorshipFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  danceStyle: {
    type: String,
    required: true,
    enum: [
      'Traditional',
      'Hip Hop',
      'Contemporary',
      'Classic',
      'Afrobeats',
      'Street',
      'Cultural',
      'Partner Dance [Kizomba and Salsa]',
      'Ballet and Classical Dance',
      'Dance Fitness',
      'Folk Dance'
    ]
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'professional']
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  portfolioLinks: String,
  mentorshipFocus: [{
    type: String,
    enum: [
      'Career Guidance',
      'Skill Improvement (E.G., Choreography, Technique)',
      'Portfolio/Performance Review',
      'Audition Preparation',
      'Networking/Industry Connections'
    ]
  }],
  goals: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['weekly', 'biweekly', 'monthly']
  },
  preferredDays: {
    type: String,
    required: true,
    enum: ['weekdays', 'weekends', 'both']
  },
  preferredTimes: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MentorshipForm', MentorshipFormSchema);