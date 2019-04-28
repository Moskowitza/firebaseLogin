const config = {
        apiKey: 'AIzaSyDJnxX7y9ku7neALQG2xTqZ9tByFOfYfwo',
        authDomain: 'loginwith-8506a.firebaseapp.com',
        databaseURL: 'https://loginwith-8506a.firebaseio.com',
        projectId: 'loginwith-8506a',
};
firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();
// info: https://firebase.google.com/docs/functions/callable
export const { functions } = firebase;

export const uiConfig = {
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

export const ui = new firebaseui.auth.AuthUI(auth);
