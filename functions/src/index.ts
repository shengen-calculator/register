import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
            console.log(error);
        });

});

export const getUserById = functions.https.onRequest((request, response) => {
    return admin.auth().getUser(request.query.uid).then((userRecord) => {
        console.log(userRecord);
        response.send(userRecord);
    })
});