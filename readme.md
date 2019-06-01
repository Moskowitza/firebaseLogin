# Firestore with Google Auth & firebaseUI

This is a short example of how to do authentication in firebase. Authenticated users can add database items to their account. Admin users can add, edit and remove database items.

## Setup

- Basic Firebase Setup

  - set up authProvider
  - init a firestore db
  - update rules
  - Whitelist your domain

- Firebase Functions: in order to authenticate admins on the serve we'll write a cloud function.
  - get firestore.cli
  - init the repo with firebase
  - write a function that passes the user id
  - We're using googleAuthProvider we don't have access to user.email
  - To Deploy functions run `firebase deploy --only functions` Changes take time.

Running on Github Pages
[Demo](https://moskowitza.github.io/firebaseLogin/)

To Deploy functions run `firebase deploy --only functions`

For local development
`firebase serve --only hosting`

SASS

## to compile sass

```
sass --watch assets/stylesheets/index.scss assets/stylesheets/index.css
```
