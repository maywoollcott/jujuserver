const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo();

const sendPushNotification = async (token, title, body) => {
  let notificationBody = {
    to: token,
    title: title,
    body: body,
    sound: 'default',
  };

  console.log(notificationBody);
  console.log('trying to send inside push noty function');
  console.log(token);

  let chunks = expo.chunkPushNotifications([notificationBody]);
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
  console.log('sent');
};

module.exports = { sendPushNotification };
