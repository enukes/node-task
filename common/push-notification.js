/* eslint-disable no-console */
const admin = require('firebase-admin');
const moment = require('moment');
const config = require('../config/constants');
const serviceAccount = require('../firebase-admin.json');

const notificationMessages = require('./notification-messages');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.fcmCreds.databaseUrl
});

const messaging = admin.messaging();

module.exports = {
  /*
   * Send push notification to single device
   */
  async notifySingleDevice(token, notification, data) {
    const payload = { token, notification, data };
    messaging.send(payload)
      .then((response) => { console.log('Successfully sent message:', response); })
      .catch((error) => { console.log('Error sending message:', error); });
  },

  /**
   * Send push notification ot multiple devices
   * @param {string} type Type of push notification
   * @param {string[]} tokens Tokens of the devices
   * @param {*} otherData Payload to send
   */
  async notifyMultipleDevices(type, tokens, otherData) {
    const notification = notificationMessages[type]({ orderId: otherData.order_id });
    const data = {
      type: config.notificationTypes.orderPlace,
      createdAt: moment.utc().toISOString(),
      notificationTitle: notification.title,
      notificationBody: notification.body,
      ...otherData
    };

    const payload = { tokens, notification, data };
    messaging.sendMulticast(payload)
      .then((response) => { console.log('Successfully sent message:', response); })
      .catch((error) => { console.log('Error sending message:', error); });
  }
};
