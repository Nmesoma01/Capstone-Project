const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    accountType: {
      type: String,
      enum: ['dancer', 'recruiter'], // Updated to match frontend values
      required: false,
    },
    location: String,
    danceStyle: {
      type: String,
      enum: [
        'traditional',
        'hipHop',
        'contemporary',
        'classic',
        'afrobeats',
        'street',
        'cultural',
        'partnerDance',
        'ballet',
        'danceFitness',
        'folk'
      ], // Updated to match frontend values
    },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'professional'],
    },
    bio: String,
    image: String,
    portfolio: String,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

UserSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);