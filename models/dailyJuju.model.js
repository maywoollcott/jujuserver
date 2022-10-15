const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyJujuSchema = new Schema({
  messageId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  opened: {
    type: Boolean,
    required: true,
  },
  thanks: {
    type: String,
    required: false,
  },
  dateSent: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('DailyJuju', DailyJujuSchema);
