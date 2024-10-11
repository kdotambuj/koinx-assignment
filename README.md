
# Project: Cryptocurrency Stats API

This project is a server-side application built with **Node.js** and **MongoDB** that fetches cryptocurrency data (Bitcoin, Ethereum, Matic) from the CoinGecko API and provides various statistics through a set of API routes. The background service runs every 2 hours to update the cryptocurrency prices in the MongoDB database.

---

## Requirements

- **Node.js**
- **MongoDB**
- **npm** (Node Package Manager)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```
   MONGO_URI=<Your MongoDB URI>
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

1. **Get Latest Cryptocurrency Stats**
   - **Route**: `/stats`
   - **Method**: `GET`
   - **Query Params**:
     - `coin`: Must be one of `bitcoin`, `ethereum`, `matic`
   - **Sample Request**:
     ```bash
     GET /stats?coin=bitcoin
     ```
   - **Sample Response**:
     ```json
     {
       "price": 40000,
       "marketCap": 800000000,
       "24hChange": 3.4
     }
     ```

2. **Get Price Standard Deviation**
   - **Route**: `/deviation`
   - **Method**: `GET`
   - **Query Params**:
     - `coin`: Must be one of `bitcoin`, `ethereum`, `matic`
   - **Sample Request**:
     ```bash
     GET /deviation?coin=bitcoin
     ```
   - **Sample Response**:
     ```json
     {
       "deviation": 4082.48
     }
     ```

---

## Background Job

- The application runs a background job every 2 hours using **node-cron** that fetches the current price, market cap, and 24-hour price change for Bitcoin, Ethereum, and Matic from the CoinGecko API, and stores it in the MongoDB database.

---

## Folder Structure

```
crypto-app/
│
├── .env                # Environment variables
├── package.json        # Project dependencies
├── index.js            # Main application entry point
├── models/
│   └── cryptoModel.js  # Mongoose schema for storing crypto data
├── services/
│   └── fetchCryptoData.js  # Service to fetch crypto data from CoinGecko
│   └── saveCryptoData.js   # Service to save the fetched data to MongoDB
└── node_modules/
```

---

## Dependencies

- **Express**: For creating API routes
- **Mongoose**: For interacting with MongoDB
- **Node-Cron**: For scheduling background tasks
- **Axios**: For making HTTP requests to the CoinGecko API
