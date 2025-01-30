import admin from "firebase-admin";

import {serviceAccount} from "./ipfs-cdn-18e97-firebase-adminsdk-fbsvc-f22ea351e9.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const auth = admin.auth();
export const db = admin.firestore();

