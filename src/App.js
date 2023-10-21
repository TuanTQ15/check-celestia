import React, { useState, useEffect } from "react";
import json from "./pre-genesis.json";


function App() {
  const [address, setAddress] = useState("");
  const [totalReward, setTotalReward] = useState(0);
  // const [mediumReward, setMediumReward] = useState({});

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = () => {
    for (const balance of json.app_state.bank.balances) {


      if (balance.address === address) {
        const reward = balance.coins[0].amount / 1_000_000;
        alert("Your reward is " + formatNumber(reward, 2) + " TIA");
        return;
      }
    }
    alert("Address not found or not eligible for rewards.");
  };



  function formatNumber(number, decimalPlaces) {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }

  useEffect(() => {
    let totalReward = 0;
    for (const balance of json.app_state.bank.balances) {
      if (balance.coins[0].amount > 0) {
        totalReward += balance.coins[0].amount / 1000_000;
      }
    }
    setTotalReward(totalReward);
  }, []);

  const displayReward = formatNumber(totalReward, 4) + " TIA";
  const displayEligibleWallets = formatNumber(
    json.app_state.bank.balances.length,
    0
  );

  // if (mediumReward && mediumReward.coins)
  //   var displayMediumReward = formatNumber(mediumReward.coins[0].amount / 1000_000, 2) + " TIA";
  return (
    <div className="App">
      <h1>Address Input</h1>
      <label htmlFor="addressInput">Enter Address:</label>
      <input
        type="text"
        id="addressInput"
        placeholder="Enter your address"
        value={address}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div className="card">
        <h2>Total Reward</h2>
        <p>{displayReward}</p>
      </div>

      <div className="card">
        <h2>Total Eligible Wallets</h2>
        <p>{displayEligibleWallets}</p>
      </div>

      {/* <div className="card">
        <h2>Lowest Reward</h2>
        <p>{displayLowestReward}</p>
      </div>

      <div className="card">
        <h2>Highest Reward</h2>
        <p>{displayHighestReward}</p>
      </div> */}

      {/* <div className="card">
        <h2>Medium Reward</h2>
        <p>{displayMediumReward}</p>
      </div> */}
    </div>
  );
}

export default App;
