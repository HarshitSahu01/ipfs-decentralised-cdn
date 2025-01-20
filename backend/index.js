import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());

import "./firebase.js";

import { getAuth, signInWithCredential, GoogleAuthProvider,} from "firebase/auth";
const auth = getAuth();

app.get("/", (req, res) => {
  res.send({msg: "API is running"+"\n meow meow sena\n\n"+auth.currentUser.uid})
});

app.post("/api/login", (req, res) => {
  // console.log(req.body.credential);
  const credential = GoogleAuthProvider.credential(req.body.credential); // Create login
  signInWithCredential(auth, credential).then(data => console.log(`user logged in ${auth.currentUser.uid}`)).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
    // ...
  });
  res.send("hi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
