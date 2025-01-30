import express from 'express'
import {db} from './firebase.js'
import {getAuth} from 'firebase-admin/auth'
const router = express.Router()

import dotenv from 'dotenv'
dotenv.config()

const auth = getAuth()

export const verifyGoogleToken = async (req, res) => {
  const { credential } = req.body;

  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const data = await response.json();

    if (data.error) {
      throw new Error('Invalid token');
    }

    const clientId = process.env.OAUTH_CLIENT_ID;
    if (data.aud !== clientId) {
      throw new Error('Token audience mismatch');
    }

    let firebaseUser;
    try {
      firebaseUser = await auth.getUser(data.jti);
    } catch (error) {
      firebaseUser = await auth.createUser({
        uid: data.jti,
        email: data.email,
        displayName: data.name,
        photoURL: data.picture,
      });

      await db.collection('users').doc(firebaseUser.uid).set({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        profile: {
          name: firebaseUser.displayName,
          picture: firebaseUser.photoURL,
          email: firebaseUser.email,
          lastLogin: new Date(),
        },
        files: []
      });
    }

    return firebaseUser;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
};

router.post('/api/login', (req, res) => {
  verifyGoogleToken(req, res)
  .then(user => {
    res.status(200).send({ message: 'User authenticated and saved successfully', user: user});
  })
  .catch(error => {
    res.status(401).send({ message: 'Invalid token' });
  });
})

// import "./firebase.js";
// import { getAuth, signInWithCredential, GoogleAuthProvider,} from "firebase/auth";
// const auth = getAuth();

// router.post("/api/login", (req, res) => {
//   // console.log(req.body.credential);
//   const credential = GoogleAuthProvider.credential(req.body.credential);
//   signInWithCredential(auth, credential)
//   .then(data => console.log(`user logged in ${auth.currentUser.uid}`))
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message; 
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(errorMessage)
//   });
//   res.send("hi");
// });

export default router;

/* 
1. If user is new or existing
if existing, just say login successfuly
if new, create a user document in users collection in firestore

validateUser(uid)

createShortLink (uid, fileId)
1. Read the file hash
2. map the short key to the hash
 */