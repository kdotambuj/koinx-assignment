import fetchCryptoData from "./fetchCrypto.js";
import {Crypto} from "../models/cryptoModel.js";


const saveCrypto = async()=>{


    const data = await fetchCryptoData();

    const cryptoArray = [
    { name: 'Bitcoin', symbol: 'BTC', data: data.bitcoin },
    { name: 'Ethereum', symbol: 'ETH', data: data.ethereum },
    { name: 'Matic', symbol: 'MATIC', data: data['matic-network'] }
    ]

    for (let crypto of cryptoArray){
        const {usd,usd_market_cap,usd_24h_change} = crypto.data;
        const newCrypto = new Crypto({
            name:crypto.name,
            symbol:crypto.symbol,
            usd:usd,
            usd_market_cap:usd_market_cap,
            usd_24h_change:usd_24h_change,
        
        });
        await newCrypto.save();

    }

    console.log('Cryptocurrency data saved to the databases');
    
}

export default saveCrypto