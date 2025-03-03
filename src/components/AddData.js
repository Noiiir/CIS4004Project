import React, { useState } from "react";
import "../SiteStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

const AddData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    category: "Game Copy",
    publisher: "",
    releaseYear: "",
    quantity: "",
    condition: "",
    pricePaid: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item data submitted:", formData);
    // Here you would typically save the item data to your database
    
    // Navigate back to the database display
    navigate("/databasedisplay", { 
      state: { 
        consoleName: location.state?.consoleName || "Console"
      } 
    });
  };

  return (
    <div className="wrapper">
      <h2>Would you like to add a new element to the database?</h2>

      <p>To add a new element to the database, we're going to need some information.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Game Copy">Game Copy</option>
            <option value="Console">Console</option>
            <option value="Peripheral">Peripheral/controller</option>
          </select>
        </div>

        <div>
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="releaseYear">Release year:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            placeholder="Release Year"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            id="condition"
            name="condition"
            placeholder="Condition"
            value={formData.condition}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="pricePaid">Price Paid:$</label>
          <input
            type="number"
            id="pricePaid"
            name="pricePaid"
            placeholder="Price Paid"
            value={formData.pricePaid}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input type="submit" value="Enter" />
        </div>
      </form>
    </div>
  );
};

export default AddData;