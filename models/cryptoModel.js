import mongoose from "mongoose";


const cryptoSchema= new mongoose.Schema({
    name: String,
    symbol: String,
    usd: {type:mongoose.Types.Decimal128},
    usd_market_cap: {type:mongoose.Types.Decimal128},
    usd_24h_change: {type:mongoose.Types.Decimal128},
    last_updated: { type: Date, default: Date.now }

})

export const Crypto = mongoose.model("Crypto",cryptoSchema)