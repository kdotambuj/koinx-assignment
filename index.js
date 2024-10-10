import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import axios from "axios";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import saveCrypto from "./services/saveCrypto.js"
dotenv.config({});







// app
const app = express();


//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// PORT
const PORT = process.env.PORT;

// api




const fetchData = async ()=>{

    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cmatic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"
    

    try{
       const response  =  await fetch(url);
       const jsonData = await response.json();
       console.log(jsonData);
       
    }
    catch(error){
        console.log('Error fetching data from CoinGecko',error);
        
    }
}


app.listen(PORT,()=>{
    connectDB();
    saveCrypto();

    console.log(`Server running on Port ${PORT}`);
})
