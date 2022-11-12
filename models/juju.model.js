const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JujuSchema = new Schema({
  messageId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  recipientPhoneNumber: {
    type: String,
    required: true,
  },
  recipientContactName: {
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Juju', JujuSchema);
