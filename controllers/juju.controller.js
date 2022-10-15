const Juju = require('../models/juju.model');

const createJuju = async (req, res) => {
  try {
    const juju = new Juju(req.body);
    const { id } = await juju.save();
    res.status(200).send({ juju, id });
  } catch (error) {
    res.status(500).send({
      error,
      message: `Could not successfully create juju. See following problems: ${error}`,
    });
  }
};

module.exports = { createJuju };
