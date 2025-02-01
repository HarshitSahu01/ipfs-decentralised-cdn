import express from 'express'
import multer from 'multer'
const router = express.Router();

import { db } from "./firebase.js"
import admin from 'firebase-admin';


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
        res.status(403).send({ msg: "Invalid Token", error: error });
        return;
    }

    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    try {
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const fileMimeType = req.file.mimetype;

        const file = new File([fileBuffer], fileName, { type: fileMimeType });
        const upload = await pinata.upload.file(file);

        const userRef = db.collection("users").doc(firebaseUser.uid);

        if (!upload || !upload.IpfsHash) {
            res.status(400).send({ msg: 'File upload failed', error: 'Invalid upload response' });
            return;
        }

        const fileRef = db.collection("files").doc(upload.IpfsHash);

        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            res.status(400).send("User does not exist.");
            return;
        }

        const userFiles = userDoc.data().files || [];
        if (userFiles.includes(fileRef.id)) {
            res.status(200).send({ msg: 'File already exists in user files', data: upload });
            return;
        }

        const doc = await fileRef.get();
        if (doc.exists) {
            await fileRef.update({
                refCount: admin.firestore.FieldValue.increment(1)
            });
        } else {
            await fileRef.set({
                name: file.name,
                size: file.size,
                type: file.mimetype || '', 
                hash: upload.IpfsHash,
                pinsize: upload.PinSize,
                timestamp: new Date().toISOString(),
                user: userRef
            }, { merge: true });
        }

        await userRef.update({
            files: admin.firestore.FieldValue.arrayUnion(fileRef.id),
        });

        res.status(200).send({ msg: 'File uploaded successfully', data: upload });
    } catch (error) {
        throw error;
        res.status(400).send({ msg: 'File upload failed', error: error.message });

    }
});


router.post("/api/deleteFile", async (req, res) => {
    let firebaseUser;
    try {
        firebaseUser = await verifyGoogleToken(req, res);
    } catch (error) {
        res.status(403).send({ msg: "Invalid Token", error: error });
        return;
    }

    const { fileRefParam } = req.body;
    if (!fileRefParam) {
        res.status(400).send({ msg: "File reference parameter is missing" });
        return;
    }

    const fileRef = db.collection("files").doc(fileRefParam);

    try {
        const doc = await fileRef.get();
        if (!doc.exists) {
            res.status(400).send("No such file exists.");
            return;
        }

        const fileData = doc.data();
        const userRef = db.collection("users").doc(firebaseUser.UID);

        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            res.status(400).send("User does not exist.");
            return;
        }

        await userRef.update({
            files: admin.firestore.FieldValue.arrayRemove(fileRefParam),
        });

        if (fileData.refCount > 1) {
            await fileRef.update({
                refCount: admin.firestore.FieldValue.increment(-1),
            });
        } else {
            await pinata.unpin(fileData.hash);
            await fileRef.delete();
        }

        res.status(200).send({ msg: 'File deleted successfully' });
    } catch (error) {
        res.status(400).send({ msg: 'Error in deleting', error: error.message });
    }
});

router.post("/api/getFiles", async (req, res) => {
    let firebaseUser;
    try {
        firebaseUser = await verifyGoogleToken(req, res);
    } catch (error) {
        res.status(403).send({ msg: "Invalid Token", error: error });
        return;
    }

    const userRef = db.collection("users").doc(firebaseUser.uid);

    try {
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            res.status(400).send("User does not exist.");
            return;
        }

        const files = userDoc.data().files;
        const fileData = [];

        for (const fileRef of files) {
            const doc = await db.collection('files').doc(fileRef).get();
            if (doc.exists) {
                fileData.push(doc.data());
            }
        }

        res.status(200).send({ msg: 'Files fetched successfully', data: fileData });
    } catch (error) {
        res.status(400).send({ msg: 'Error in fetching files', error: error.message });
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