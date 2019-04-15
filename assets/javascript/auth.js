const uiConfig = {
        signInSuccessUrl: 'https://moskowitza.github.io/firebaseLogin/account.html',
        signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        tosUrl: 'https://moskowitza.github.io/firebaseLogin/account.html',
};
// const app = firebase.initializeApp(config);
// const auth = app.auth();
const ui = new firebaseui.auth.AuthUI(auth);

ui.start(`#firebaseui-auth-container`, uiConfig);
