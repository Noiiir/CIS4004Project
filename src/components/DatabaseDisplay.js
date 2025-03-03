import React, { useState, useEffect } from "react";
import "../SiteStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

const DatabaseDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [consoleName, setConsoleName] = useState("Console");
  
  useEffect(() => {
    // Get console name from state if available
    if (location.state && location.state.consoleName) {
      setConsoleName(location.state.consoleName);
    }
  }, [location]);

  return (
    <div className="wrapper">
      <h2>Welcome to the database!</h2>

      <p>You can add, edit, remove, and search for any item that you want!</p>

      <button onClick={() => navigate("/adddata")}>add a new element</button>

      <table>
        <caption>{consoleName} Database</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Catagory</th>
            <th>Publisher/Manufacturer</th>
            <th>Release Year</th>
            <th>Quantity</th>
            <th>Condition</th>
            <th>Price Paid</th>
          </tr>
        </thead>
        <tbody>
          {/* Table content will be populated dynamically */}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseDisplay;