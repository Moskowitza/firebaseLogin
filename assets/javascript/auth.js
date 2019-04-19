// (function() {
// Initialize Firebase
const config = {
        apiKey: 'AIzaSyDJnxX7y9ku7neALQG2xTqZ9tByFOfYfwo',
        authDomain: 'loginwith-8506a.firebaseapp.com',
        databaseURL: 'https://loginwith-8506a.firebaseio.com',
        projectId: 'loginwith-8506a',
        // storageBucket: 'loginwith-8506a.appspot.com',
        // messagingSenderId: '437861183874',
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
function addDataToDom() {
        db.collection('users')
                .get()
                .then(snapshot => {
                        loadData(snapshot);
                })
                .catch(function(error) {
                        console.error('Error adding document: ', error);
                });
}

const uiConfig = {
        callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl) {
                        // console.log(`authResult: ${JSON.parse(authResult)}`);
                        // console.log(`redirectUrl: ${JSON.parse(redirectUrl)}`);
                        const { user } = authResult;
                        const { credential } = authResult;
                        const { isNewUser } = authResult.additionalUserInfo;
                        const { providerId } = authResult.additionalUserInfo;
                        const { operationType } = authResult;
                        // Do something with the returned AuthResult.
                        // document.getElementById('userName').innerText = user;
                        // Return type determines whether we continue the redirect automatically
                        // console.log(`user ${JSON.parse(user)}`);
                        // or whether we leave that to developer to handle.
                        return true;
                },
                signInFailure(error) {
                        // Some unrecoverable error occurred during sign-in.
                        // Return a promise when error handling is completed and FirebaseUI
                        // will reset, clearing any UI. This commonly occurs for error code
                        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                        // occurs. Check below for more details on this.
                        return handleUIError(error);
                },
                uiShown() {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                },
        },
        signInSuccessUrl: 'https://moskowitza.github.io/firebaseLogin/account.html',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        tosUrl: 'https://moskowitza.github.io/firebaseLogin/privacy.html',
        privacyPolicyUrl: 'https://moskowitza.github.io/firebaseLogin/privacy.html',
};

const ui = new firebaseui.auth.AuthUI(auth);
ui.start(`#firebaseui-auth-container`, uiConfig);

const signOutBtn = document.getElementById('signOut');
const authWidget = document.getElementById('firebaseui-auth-container');
const welcomeSpan = document.getElementById('userName');
signOutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        auth.signOut().then(() => console.log('User signed out'));
});

auth.onAuthStateChanged(function(user) {
        if (user) {
                // User is signed in.
                console.log(`HEllo user ${JSON.stringify(user)}`);
                signOutBtn.classList.remove('hidden');
                authWidget.classList.add('hidden');
                if (welcomeSpan) {
                        welcomeSpan.innerHTML = user.displayName;
                }
                addDataToDom();
        } else {
                // No user is signed in.
                console.log('No User');
                signOutBtn.classList.add('hidden');
                authWidget.classList.remove('hidden');
                if (welcomeSpan) {
                        welcomeSpan.innerHTML = '';
                }
        }
});
// })();
