const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1: You received a Juju!
// 2: Your Juju was opened
// 3: __ sent you a thank you for the juju you sent them

const NotificationSchema = new Schema({
  notificationTypeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  jujuId: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
