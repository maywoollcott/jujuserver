const Juju = require('../models/juju.model');
const { sendJujuText } = require('../smsHandler');

const sendJuju = async (req, res) => {
  console.log(req.body);
  try {
    //first, create the juju
    const juju = new Juju(req.body);
    await juju.save();
    console.log('juju saved');

    //if account doesnt exist send twilio text
    let resp = await sendJujuText(req.body.recipientPhoneNumber);

    console.log(res);
    console.log('successfully sent on server');

    if (resp === 'accepted') {
      res.status(200).send();
    } else {
      res.status(404).send({
        message: 'Could not successfully send text',
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: `Could not successfully send juju. See following problems: ${error}`,
    });
  }
};

const fetchJujusByUser = async (req, res) => {
  try {
    console.log('getting jujus');
    console.log(req.body);
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    const jujus = await Juju.find({ recipientPhoneNumber: phoneNumber });
    const sentJujus = await Juju.find({ senderId: req.user });
    res.status(200).send({ jujus, sentJujus });
  } catch (error) {
    res.status(500).send({
      error,
      message: `Could not successfully fetch jujus. See following problems: ${error}`,
    });
  }
};

const updateJuju = async (req, res) => {
  console.log('updating juju');
  try {
    console.log(req.body);
    const filter = { _id: req.body.id };
    const update = req.body.updateObj;
    const newJuju = await Juju.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(newJuju);
    res.status(200).send({ newJuju });
  } catch (error) {
    res.status(500).send({
      error,
      message: `Juju could not be updated. Problem: ${error}`,
    });
  }
};

module.exports = { sendJuju, fetchJujusByUser, updateJuju };
