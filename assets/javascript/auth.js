(function() {
        // Initialize Firebase
        const config = {
                apiKey: 'AIzaSyDJnxX7y9ku7neALQG2xTqZ9tByFOfYfwo',
                authDomain: 'loginwith-8506a.firebaseapp.com',
                databaseURL: 'https://loginwith-8506a.firebaseio.com',
                projectId: 'loginwith-8506a',
                storageBucket: 'loginwith-8506a.appspot.com',
                messagingSenderId: '437861183874',
        };
        const app = firebase.initializeApp(config);
        const uiConfig = {
                callbacks: {
                        signInSuccessWithAuthResult(authResult, redirectUrl) {
                                console.log(`authResult: ${authResult}`);
                                console.log(`redirectUrl: ${redirectUrl}`);
                                const { user } = authResult;
                                const { credential } = authResult;
                                const { isNewUser } = authResult.additionalUserInfo;
                                const { providerId } = authResult.additionalUserInfo;
                                const { operationType } = authResult;
                                // Do something with the returned AuthResult.
                                // Return type determines whether we continue the redirect automatically
                                alert(`hi ${user}`);
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
        const auth = app.auth();
        const ui = new firebaseui.auth.AuthUI(auth);
        ui.start(`#firebaseui-auth-container`, uiConfig);

        const signOutBtn = document.getElementById('signOut');
        signOutBtn.addEventListener('click', function(event) {
                alert('sign out');
                firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                        // User is signed in.
                        console.log(user);
                        signOutBtn.classList.remove('hidden');
                } else {
                        // No user is signed in.
                        console.log('No User');
                        signOutBtn.classList.add('hidden');
                }
        });
})();
