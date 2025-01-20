import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './auth.js';

dotenv.config();
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());

app.use('/', authRoutes);

app.get("/", (req, res) => {
  res.send({msg: "API is running"+"\n meow meow sena\n\n"+auth.currentUser.uid})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
