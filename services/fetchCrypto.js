import axios from "axios";

const fetchCryptoData = async ()=>{

    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cmatic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"

    try{
       const response  =  await fetch(url);
       const jsonData = await response.json();
       
       return jsonData
       
    }
    catch(error){
        console.log('Error fetching data from CoinGecko',error);
        
    }

}

export default fetchCryptoData;