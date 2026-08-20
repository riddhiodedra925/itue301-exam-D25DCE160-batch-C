const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Member email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Member', memberSchema);
