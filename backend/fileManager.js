import express from 'express'
import multer from 'multer'
const router = express.Router();

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

router.post("/api/testUpload", upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const fileMimeType = req.file.mimetype;

        console.log(fileName, fileMimeType);

        const file = new File([fileBuffer], fileName, { type: fileMimeType });
        const upload = await pinata.upload.file(file);

        res.status(200).send({ msg: 'File uploaded successfully', data: upload });
    } catch (error) {
        res.status(400).send({ msg: 'File upload failed', error: error.message });
    }
});


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