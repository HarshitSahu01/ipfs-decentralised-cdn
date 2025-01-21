import express from 'express'
import {getAuth} from 'firebase-admin/auth'
import {db} from './firebase.js'
const router = express.Router()

const auth = getAuth()

export const verifyGoogleToken = async (req, res) => {
  const credential = req.body.credential;

  try {
    const decodedToken = await auth.verifyIdToken(credential);

    let firebaseUser;
    try {
      firebaseUser = await auth.getUser(decodedToken.uid);
    } catch (error) {
      firebaseUser = await auth.createUser({
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
      });

      await db.collection('users').doc(firebaseUser.uid).set({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        profile: {
          name: firebaseUser.displayName,
          picture: firebaseUser.photoURL,
          email: firebaseUser.email,
          lastLogin: new Date(),
        }
      });
    }

    // Send response back
    // res.status(200).send({ message: 'User authenticated and saved successfully', user: firebaseUser });
    return firebaseUser;

  } catch (error) {
    console.error('Invalid token', error);
    throw new Error('Invalid token')
  }
};

router.post('/api/login', (req, res) => {
  verifyGoogleToken(req, res)
  .then(user => {
    res.status(200).send({ message: 'User authenticated and saved successfully' });
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