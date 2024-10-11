import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import saveCrypto from "./services/saveCrypto.js"
import cryptoRoute from "./routes/crypto.route.js"
import cron from "node-cron"
dotenv.config({});







// app
const app = express();


//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// PORT
const PORT = process.env.PORT || 3000;

// api
app.use("/api",cryptoRoute)


cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    saveCrypto();
  });

app.listen(PORT,()=>{
    connectDB();
    saveCrypto()
    console.log(`Server running on Port ${PORT}`);
})
