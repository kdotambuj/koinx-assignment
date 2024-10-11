import { Crypto } from "../models/cryptoModel.js";


export const getStats = async (req, res) => {
    try {
      const { coin } = req.query; // Extract the coin from query params
  
      // Validate coin input
      if (!["bitcoin", "ethereum", "matic"].includes(coin)) {
        return res
          .status(400)
          .json({
            error: "Invalid coin. Must be one of: bitcoin, ethereum, matic.",
          });
      }
  
      const crypto = await Crypto.findOne({ name: new RegExp(coin, "i") })
        .sort({ last_updated: -1 }) // Sort by most recent data
        .exec();
  
      // If no data is found
      if (!crypto) {
        return res
          .status(404)
          .json({ error: "No data found for the requested cryptocurrency." });
      }
  
      // Return the relevant stats
      const price = parseFloat(crypto.usd.toString());
      const usd_market_cap = parseFloat(crypto.usd_market_cap.toString());
      const usd_24h_change = parseFloat(crypto.usd_24h_change.toString());
      
      return res.status(201).json({
        name: crypto.name,
        price: price,
        marketCap: usd_market_cap,
        "24hChange": usd_24h_change
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const getDeviation = async (req,res)=>{

    try {

      const {coin} = req.query;

      if (!["bitcoin", "ethereum", "matic"].includes(coin)) {
        return res
          .status(400)
          .json({
            error: "Invalid coin. Must be one of: bitcoin, ethereum, matic.",
          });
      }


      const crypto = await Crypto.find({name: new RegExp(coin,"i")}).sort({last_updated:-1}).limit(100).select('usd').exec();
      if (crypto.length ==0) {
        return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
      }

      const prices = crypto.map((record,index)=>{
        return parseFloat(record.usd.toString());
      })

      // calculate mean
      const mean = prices.reduce((accumulator,current)=>accumulator+current,0)/prices.length;
      const variance = prices.reduce((acc,curr)=>Math.pow(mean-curr,2)+acc,0)/prices.length;
      const standardDeviation = Math.sqrt(variance);

      return res.status(201).json({
        deviation:parseFloat(standardDeviation.toFixed(4))
      })

    } catch (error) {
      console.log("Error calculating deviation ",error);
      return res.status(500).json({ error: 'Internal server error' });
    
    }


  }
  