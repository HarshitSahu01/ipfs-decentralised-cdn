import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {app as fb_app} from './firebase.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
