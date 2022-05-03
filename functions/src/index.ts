const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { warn } = require("firebase-functions/lib/logger");

admin.initializeApp();


export const onNewUserCreate = functions.auth.user().onCreate((user) => {
    const usersRef = admin.database().ref('users');
    //console.log(user);

    return usersRef.child(user.uid).set({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        provider: user.providerData[0].providerId,
        providerId: user.providerData[0].uid
    })
        .catch(error => {
            warn(JSON.stringify(error));
        });

});

export const getUserById = functions.https.onRequest((request, response) => {
    return admin.auth().getUser(request.query.uid).then((userRecord) => {
        response.send(userRecord);
    })
});