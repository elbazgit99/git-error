import express from "express";
import groupRoutes from "./routes/Group.routes.js"
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())

app.use("/group" , groupRoutes)

// create serveur
app.listen(PORT, () => {
    connectDB;
    console.log(`server connected in port ${PORT}`);
});


