import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedStock, setSelectedStock] = useState("RELIANCE");
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async (event) => {setStockData("loading");
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/data", {
        stockSelected: selectedStock,
      });

      setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  return (
    <div className="App">
      <h1>Fetch the Data Related to Any Stock</h1>
      <br />
      <h2>Select the Stock</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedStock} onChange={handleStockChange}>
          <option value="RELIANCE">RELIANCE</option>
          <option value="INFY">INFOSYS</option>
          <option value="TCS">TCS</option>
          <option value="WIPRO">WIPRO</option>
          <option value="ICICIBANK">ICICI Bank</option>
          <option value="ITC">ITC</option>
        </select>
        <button type="submit">Fetch Data</button>
      </form>

      {(stockData && ((stockData!=="loading" && (
        <div>
          <h3>{stockData.symbol}</h3>
          <p>Open: {stockData.open}</p>
          <p>Day High: {stockData.dayHigh}</p>
          <p>Day Low: {stockData.dayLow}</p>
          <p>Last Price: {stockData.lastPrice}</p>
          <p>Previous Close: {stockData.previousClose}</p>
          <p>Year High: {stockData.yearHigh}</p>
          <p>Year Low: {stockData.yearLow}</p>
          <p>Last Update Time: {stockData.lastUpdateTime}</p>
        </div>
      )) || (stockData==="loading" && (<div>Loading....</div>))))}
    </div>
  );
}

export default App;
