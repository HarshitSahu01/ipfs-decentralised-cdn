import express from 'express'
const router = express.Router();

import fs from "fs";
import {PinataSDK} from "pinata-web3";
import dotenv from "dotenv";
dotenv.config();

import "./firebase.js";
import { getAuth, signInWithCredential, GoogleAuthProvider, } from "firebase/auth";
const auth = getAuth();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.GATEWAY_URL
})

async function upload() {
    try {
        const blob = new Blob([fs.readFileSync("./sample.txt")]);
        const file = new File([blob], "sample.txt", { type: "text/plain" })
        const upload = await pinata.upload.file(file);
        console.log(upload)
    } catch (error) {
        console.log(error)
    }
}

// upload() 

router.post("/api/testUpload", (req, res) => {
    

router.post("/api/storefile", (req, res) => {
    res.send("Hello World")
});

export default router;

/*
getFiles
storeFile
deleteFile

/api/testUpload
params: credentials, file
file -> name, File()
res -> 200 file uploaded successfully
res -> 400 file upload failed

/testUpload
upload fiile type = "file/upload"
<form action="/api/testUpload" method="post" enctype="multipart/form-data">

*/