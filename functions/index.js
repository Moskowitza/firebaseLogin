const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.addAdminRole = functions.https.onCall((data, context) =>
        // We need to get User and add custom claim(admin)
        admin
                .auth()
                .getUser(data.uid)
                .then(user =>
                        admin.auth().setCustomUserClaims(user.uid, {
                                admin: true,
                        })
                )
                .then(() =>
                        // return user to the front end
                        ({
                                message: `success!${data.displayName} has been made an admin`,
                        })
                )
                .catch(err => err)
);
