const provider = new firebase.auth.GoogleAuthProvider();
console.log(`provider: ${provider}`);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
console.log(`ui: ${ui}`);
function googleSignin() {
        ui.start('#firebaseui-auth-container', {
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
                        alert('Signed Out');
                })
                .catch(function(error) {
                        // An error happened.
                        console.log(error);
                });
}

firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
                // User is signed in.
                const { displayName } = user;
                const { email } = user;
                const { emailVerified } = user;
                const { photoURL } = user;
                const { isAnonymous } = user;
                const { uid } = user;
                const { providerData } = user;
                // ...
                console.log(email);
                window.location('/account.html');
        } else {
                // User is signed out.
                // ...
                console.log('no user');
        }
});
