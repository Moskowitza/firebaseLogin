// Initialize Firebase
const signOutBtn = document.getElementById('signOut');
const authWidget = document.getElementById('firebaseui-auth-container');
const welcomeSpan = document.getElementById('userName');
const dataDiv = document.getElementById('dataDiv');
const createForm = document.querySelector('#addClimb');
const currentUser = {};
// Initialize App
const config = {
        apiKey: 'AIzaSyDJnxX7y9ku7neALQG2xTqZ9tByFOfYfwo',
        authDomain: 'loginwith-8506a.firebaseapp.com',
        databaseURL: 'https://loginwith-8506a.firebaseio.com',
        projectId: 'loginwith-8506a',
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

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

signOutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        auth.signOut().then(() => console.log('User signed out'));
});

function loadData(data) {
        dataDiv.innerHTML = '';
        console.log('load Data');
        if (data) {
                data.forEach(item => {
                        const climb = item.data();
                        const li = document.createElement('li');
                        li.innerHTML = `<div class="climbDeets">
                        </div>
                        <div>${climb.Name}</div>
                        <div>${climb.Grade}</div>
                        `;
                        dataDiv.appendChild(li);
                        const button = document.createElement('button');
                        button.setAttribute('id', item.id);
                        button.setAttribute('class', 'saveClimb');
                        button.textContent = 'save';
                        // You made a button in a button dumby
                        button.addEventListener('click', saveClimb);
                        dataDiv.appendChild(button);
                });
        } else {
                dataDiv.innerHTML = `<h5>You Are Not Logged In</h5>`;
        }
}

auth.onAuthStateChanged(function(user) {
        if (user) {
                // User is signed in.
                currentUser = user;
                console.log(`Hello user: ${JSON.stringify(user, null, 4)}`);
                signOutBtn.classList.remove('hidden');
                authWidget.classList.add('hidden');
                dataDiv.classList.remove('hidden');
                // Load ALL collections
                db.collection('climbs').onSnapshot(
                        function(snapshot) {
                                console.log(snapshot.docs);
                                loadData(snapshot);
                        },
                        function(error) {
                                console.error(error);
                        }
                );
                // Todo load USER'S saved collection ??
                // db.collection('userClimbs').doc(user.id).onSnapshot(
                //         function(snapshot) {
                //                 console.log(snapshot.docs);
                //         },
                //         function(error) {
                //                 console.error(error);
                //         }
                // );
                // If you're on account.html, load the following
                if (welcomeSpan && createForm) {
                        welcomeSpan.innerHTML = user.displayName;
                        createForm.classList.remove('hidden');
                }
        } else {
                // No user is signed in.
                console.log('No User');
                signOutBtn.classList.add('hidden');
                authWidget.classList.remove('hidden');
                if (welcomeSpan && createForm) {
                        createForm.classList.add('hidden');
                        welcomeSpan.innerHTML = ', login to View Documents';
                }
                loadData([]);
        }
});
// If on Account page and logged in
if (createForm) {
        createForm.addEventListener('submit', event => {
                event.preventDefault();
                console.log(`adding ${createForm.climbName.value}`);
                db.collection('climbs')
                        .add({
                                Name: createForm.climbName.value,
                                Grade: createForm.climbGrade.value,
                        })
                        .then(() => {
                                createForm.reset();
                        })
                        .catch(err => console.error(err));
        });
}
// An array of climbs the user has saved.
const climbList = [];

function saveClimb(event) {
        event.preventDefault();
        // get current list
        console.log('save Button');
        console.log(this.id);
        console.log(event);
        console.log(`Current User: ${JSON.stringify(currentUser, null, 4)}`);
        climbList.push(this.id);
        db.collection('usersClimbs')
                .doc(currentUser.id)
                .set({
                        climbList,
                })
                .catch(err => console.error(err));
}
