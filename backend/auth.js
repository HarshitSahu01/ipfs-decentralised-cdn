import express from 'express'
const router = express.Router()

import "./firebase.js";
import { getAuth, signInWithCredential, GoogleAuthProvider,} from "firebase/auth";
const auth = getAuth();

router.post("/api/login", (req, res) => {
  // console.log(req.body.credential);
  const credential = GoogleAuthProvider.credential(req.body.credential);
  signInWithCredential(auth, credential)
  .then(data => console.log(`user logged in ${auth.currentUser.uid}`))
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message; 
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
  });
  res.send("hi");
});

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