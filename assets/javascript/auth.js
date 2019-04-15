const uiConfig = {
        callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl) {
                        const { user } = authResult;
                        const { credential } = authResult;
                        const { isNewUser } = authResult.additionalUserInfo;
                        const { providerId } = authResult.additionalUserInfo;
                        const { operationType } = authResult;
                        // Do something with the returned AuthResult.
                        // Return type determines whether we continue the redirect automatically
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
        tosUrl: 'https://moskowitza.github.io/firebaseLogin/account.html',
};

const auth = app.auth();
const ui = new firebaseui.auth.AuthUI(auth);
ui.start(`#firebaseui-auth-container`, uiConfig);
