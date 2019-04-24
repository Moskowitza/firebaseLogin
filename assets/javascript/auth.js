// Select Dom Elements for manipulations
const signOutBtn = document.getElementById('signOut');
const authWidget = document.getElementById('firebaseui-auth-container');
const welcomeSpan = document.getElementById('userName');
const dataDiv = document.getElementById('dataDiv');
const savedDataDiv = document.getElementById('savedDataDiv');
const createForm = document.querySelector('#addClimb');
// The State of the page will have a user and savedClimbsArray
let currentUser = {};
let savedClimbsArray = []; // these are just the IDs we store in FB
let savedClimbObjs = []; // here are the {climbs}themselves
// Initialize App
// config is for connecting to the DB
const config = {
        apiKey: 'AIzaSyDJnxX7y9ku7neALQG2xTqZ9tByFOfYfwo',
        authDomain: 'loginwith-8506a.firebaseapp.com',
        databaseURL: 'https://loginwith-8506a.firebaseio.com',
        projectId: 'loginwith-8506a',
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
// uiConfig for using the firebase ui with google login
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

// Signout Function works with firebase.auth() promise
function signOut(event) {
        event.preventDefault();
        auth.signOut()
                .then(() => console.log('User signed out'))
                .then(() => window.location.replace('https://moskowitza.github.io/firebaseLogin/'))
                .catch(err => console.error(err));
}
// displayAllClimbs takes FirestoreData and adds it to the DOM
function displayAllClimbs(data) {
        //
        dataDiv.innerHTML = '';
        console.log('load Data');
        if (data) {
                data.forEach(item => {
                        const climb = item.data();
                        const li = document.createElement('li');
                        li.innerHTML = `<div class="climbDeets">
                                <div>${climb.Name}</div>
                                <div>${climb.Grade}</div>
                        </div>
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
function removeClimb() {
        console.log('TODO, remove CLimb');
}
// displaySavedClimbs takes savedClimbObjs and adds it to the DOM
// data === savedClimbsArray whenever called.
function displaySavedClimbs() {
        savedDataDiv.innerHTML = '';
        console.log(`loading Saved Climbs: ${savedClimbObjs}`);
        if (savedClimbObjs.length) {
                savedClimbObjs.forEach(climb => {
                        const li = document.createElement('li');
                        li.innerHTML = `<div class="savedClimbDeets">
                                <div>${climb.Name}</div>
                                <div>${climb.Grade}</div>
                        </div>`;
                        savedDataDiv.appendChild(li);
                        const button = document.createElement('button');
                        button.setAttribute('id', climb.Name);
                        button.setAttribute('class', 'saveClimb');
                        button.textContent = 'remove';
                        // You made a button in a button dumby
                        button.addEventListener('click', removeClimb);
                        savedDataDiv.appendChild(button);
                });
        } else {
                savedDataDiv.innerHTML = `<h5>No Saved Data</h5>`;
        }
}
// When savedClimbsArry is updated, this function should be called to
// 1- make a fb call to get details of climb
// 2- invoke updating the dom displaySavedClimbs
function getSavedClimbsDeets() {
        savedClimbObjs = [];
        savedClimbsArray.forEach(climb =>
                db
                        .collection('climbs')
                        .doc(climb)
                        .get()
                        .then(function(doc) {
                                // console.log(`Saved Climb ${JSON.stringify(snapshot.data(), null, 3)}`);
                                savedClimbObjs.push(doc.data());
                        })
                        .then(() => displaySavedClimbs())
                        .catch(err => console.error(err))
        );
}
// Call this function when save button is clicked
function saveClimb(event) {
        event.preventDefault();
        // if this climb is not already in the savedClimbs array add it
        if (!savedClimbsArray.includes(this.id)) savedClimbsArray.push(this.id);
        // save the changes to firebase
        db.collection('usersClimbs')
                .doc(currentUser.uid)
                .set({
                        savedClimbsArray,
                })
                .then(getSavedClimbsDeets())
                .catch(err => console.error(err));
        // Then get a response from the server
        // this will run when onSnapshot runs?
        // getSavedClimbsDeets();
}

// Auth State Change listener, when user logs in
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
                                displayAllClimbs(snapshot);
                        },
                        function(error) {
                                console.error(error);
                        }
                );
                // Todo load USER'S saved collection
                // Firestore,s GET takes a second cb for errors,
                db.collection('usersClimbs')
                        .doc(currentUser.uid)
                        .get()
                        .then(function(doc) {
                                if (doc.exists) {
                                        console.log('Document data:', doc.data());
                                        savedClimbsArray = [...doc.data().savedClimbsArray];
                                        getSavedClimbsDeets();
                                } else {
                                        // doc.data() will be undefined in this case
                                        console.log('No such document!');
                                }
                        })
                        .catch(function(error) {
                                console.log('Error getting document:', error);
                        });

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
                displayAllClimbs([]);
        }
});
// If on Account page createForm exists
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

if (signOutBtn) signOutBtn.addEventListener('click', signOut);

// db.collection('usersClimbs')
//         .doc(currentUser.uid)
//         .onSnapshot(
//                 function(doc) {
//                         savedClimbsArray = [...doc.data().savedClimbsArray];
//                         getSavedClimbsDeets();
//                 },
//                 function(err) {
//                         console.error(err);
//                 }
//         );
