const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

const sendJujuText = async (phoneNumber) => {
  try {
    const messageRes = await client.messages.create({
      body: 'Someone sent you a compliment on Juju! Juju is a mobile app designed to spread positivity. Download Juju to read what they said: https://www.diviitarot.com/',
      messagingServiceSid: messagingServiceSid,
      to: phoneNumber,
    });
    console.log(messageRes);
    return messageRes.status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { sendJujuText };
