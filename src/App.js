import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './awnex-90-logo.png'; // Ensure this path is correct

function App() {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from your API or Google Sheets
      const response = await fetch('/path/to/your/api');
      const data = await response.json();
      // Assuming you do something with the data here
      // For example:
      // setOrderData(data.orderData);
      // setWorkOrderData(data.workOrderData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveChanges = async () => {
    try {
      // Save changes to your API or Google Sheets
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
        <button id="home-link" onClick={() => window.location.href = '/'}>Home</button>
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
              <button id="settings-button" onClick={() => alert('Settings button clicked')}>Settings</button>
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
