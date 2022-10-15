const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//types: 1-Admiration, 2-Gratitude, 3-Superlative
//categories: 1-Joy, 2-Humor

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  //Admiration, gratitude, or superlative
  type: {
    type: String,
    required: true,
  },
  //Joy, humor, etc.
  categories: [
    {
      type: String,
      required: false,
    },
  ],
  custom: {
    type: Boolean,
    required: true,
  },
  //These are only used if custom is true:
  customOwnerId: {
    type: String,
    required: false,
  },
  //If awaiting review, will be false, if true, ready to display, if its rejected, will simply delete the Message
  customApproved: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
