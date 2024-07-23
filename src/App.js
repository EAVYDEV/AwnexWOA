import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './awnex-90-logo.png'; // Ensure the logo is in the src folder

function App() {
  const [orderData, setOrderData] = useState([]);
  const [workOrderData, setWorkOrderData] = useState([]);
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from your API or Google Sheets
      // Example:
      const response = await fetch('/path/to/your/api');
      const data = await response.json();
      setOrderData(data.orderData);
      setWorkOrderData(data.workOrderData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (row, col, value) => {
    setChanges(prev => [...prev, { row, col, value }]);
    // Highlight changes and update save button state
  };

  const saveChanges = async () => {
    try {
      // Save changes to your API or Google Sheets
      // Example:
      for (const change of changes) {
        await fetch(`/path/to/your/api/${change.row}/${change.col}`, {
          method: 'POST',
          body: JSON.stringify({ value: change.value }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      setChanges([]);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="App">
      <div className="breadcrumbs">
        <a href="#" id="home-link">Home</a>
      </div>
      <div className="header">
        <img src={logo} alt="Awnex Logo" className="logo" />
        <h1 className="title">Awnex Work Order App</h1>
        <div className="controls">
          <button id="refresh-button" onClick={fetchData}>Refresh</button>
          <button id="save-button" onClick={saveChanges}>Save</button>
          <div className="dropdown">
            <button className="dropbtn">&#9776;</button>
            <div className="dropdown-content">
              <a href="#" id="settings-button">Settings</a>
            </div>
          </div>
        </div>
      </div>
      <div id="order-info">
        <h2>Order Information</h2>
        <table id="order-table">
          <thead>
            {/* Headers will be dynamically added here */}
          </thead>
          <tbody id="order-list">
            {/* Order items will be added here dynamically */}
          </tbody>
        </table>
      </div>
      <div id="materials-list">
        <h2>Work Orders</h2>
        <table>
          <thead>
            {/* Headers will be dynamically added here */}
          </thead>
          <tbody id="list">
            {/* Material items will be added here dynamically */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
