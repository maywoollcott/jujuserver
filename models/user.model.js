const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: String,
    required: true,
  },
  jujuls: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
