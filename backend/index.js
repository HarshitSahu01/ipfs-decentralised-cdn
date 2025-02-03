import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./firebase.js"
import authRoutes from './auth.js';
import fileManagerRoutes from "./fileManager.js";

// import { getAuth } from "firebase/auth";
// const auth = getAuth();

dotenv.config();
const app = express();
app.use(cors({credentials: true, origin: ['http://localhost:5173', 'https://ipfs-decentralised-cdn.vercel.app']}));
app.use(express.json());

app.use('/', authRoutes);
app.use('/', fileManagerRoutes);

app.get("/", (req, res) => {
  res.send({
    msg: "API is running"+"\n meow meow sena\n\n", 
    // "uid": auth.currentUser?auth.currentUser.uid:'no login'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
