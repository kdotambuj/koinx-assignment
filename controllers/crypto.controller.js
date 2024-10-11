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
      
      return res.json({
        name: crypto.name,
        price: crypto.usd,
        marketCap: crypto.usd_market_cap,
        "24hChange": crypto.usd_24h_change,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  