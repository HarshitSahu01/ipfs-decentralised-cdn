import express from 'express'
import multer from 'multer'
const router = express.Router();

import { db } from "./firebase.js"

import { verifyGoogleToken } from "./auth.js"

import fs from "fs";
import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.GATEWAY_URL
})

// async function upload() {
//     try {
//         const blob = new Blob([fs.readFileSync("./sample.txt")]);
//         const file = new File([blob], "sample.txt", { type: "text/plain" })
//         const upload = await pinata.upload.file(file);
//         console.log(upload)
//     } catch (error) {
//         console.log(error)
//     }
// }

// upload() 

router.post("/api/uploadFile", upload.single('file'), async (req, res) => {
    let firebaseUser;
    try {
        firebaseUser = await verifyGoogleToken(req, res);
    } catch (error) {
        res.status(403).send({ msg: "Invalid Token", error: error })
    }

    if (!req.file) {
        res.status(400).send('No file uploaded.');
    }

    try {
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const fileMimeType = req.file.mimetype;

        console.log(fileName, fileMimeType);

        const file = new File([fileBuffer], fileName, { type: fileMimeType });
        const upload = await pinata.upload.file(file);

        const userRef = db.collection("users").doc(firebaseUser.UID)

        const fileRef = db.collection("files").add({
            name: file.name,
            size: file.size,
            type: file.mimetype,
            hash: upload.IpfsHash,
            pinsize: upload.PinSize,
            timestamp: new Date().toISOString(),
            user: userRef
        })

        await userRef.update({
            files: admin.firestore.FieldValue.arrayUnion(fileRef),
        });

        res.status(200).send({ msg: 'File uploaded successfully', data: upload });
    } catch (error) {
        res.status(400).send({ msg: 'File upload failed', error: error.message });
    }
});


router.post("/api/deleteFile", async (req, res) => {
    let firebaseUser;
    try {
        firebaseUser = await verifyGoogleToken(req, res);
    } catch (error) {
        res.status(403).send({ msg: "Invalid Token", error: error })
    }

    const {fileRefParam} = req.body
    const fileRef = db.collection("files").doc(fileRefParam)

    //check if file exists
    //ipfs then files then user delete

    if(!fileRef){
        res.status(400).send("No such file exists.")
    }

    try {
        const unpin = await pinata.unpin([fileRef.hash])

        await fileRef.delete();


        
    } catch (error){
        res.status(400).send({msg:'Error in deleting', error: error} )
    }
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