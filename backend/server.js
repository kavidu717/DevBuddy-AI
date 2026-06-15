import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./src/routes/aiRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.use("/api",aiRouter )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
     console.log(`Server running on port ${PORT}`)
);