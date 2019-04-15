const provider = new firebase.auth.GoogleAuthProvider();
console.log(`provider: ${provider}`);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
console.log(`ui: ${ui}`);
function googleSignin() {
        ui.start('#firebaseui-auth-container', {
                signInSuccessUrl: '/',
                signInOptions: [
                        // List of OAuth providers supported.
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
        });
}
function googleSignout() {
        firebase.auth()
                .signOut()
                .then(function() {
                        // Sign-out successful.
                })
                .catch(function(error) {
                        // An error happened.
                });
}
