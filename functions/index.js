// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.newUser = functions.auth.user().onCreate(event => {
    const user = event.data; // The Firebase user.
    const usersRef = admin.database().ref('users');

    return usersRef.child(user.uid).set({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        provider: user.providerData[0].providerId,
        providerId: user.providerData[0].uid
    });
});

