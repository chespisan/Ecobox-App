//import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();

/*
exports.newSubscriberNotification = functions.firestore
    .document('subscribers/{subscriptionId}')
    .onCreate(async event => {
        
    const data = event.after.data();


    const userId = data.userId
    const subscriber = data.subscriberId

    // Notification content
    const payload = {
      notification: {
          title: 'Nuevo Usuario',
          body: `${subscriber} recibe las notificaciones de EcoBox!`,
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', userId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});*/