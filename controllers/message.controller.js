const Message = require('../models/message.model');

const createMessage = async (req, res) => {
  const existingMessage = await Message.findOne({
    message: req.body.message,
  });
  if (existingMessage) {
    return res
      .status(409)
      .send('That message already exists. Please create a new message.');
  }
  try {
    const message = new Message(req.body);
    message.dateCreated = Date.now();
    const { id } = await message.save();
    res.status(200).send({ message, id });
  } catch (error) {
    res.status(500).send({
      error,
      message: `Could not successfully create message. See following problems: ${error}`,
    });
  }
};

module.exports = { createMessage };
