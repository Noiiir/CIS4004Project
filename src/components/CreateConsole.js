import React, { useState } from "react";
import "../SiteStyles.css";
import { useNavigate } from "react-router-dom";

const CreateConsole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    consoleName: "",
    releaseYear: "",
    manufacturer: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Console data submitted:", formData);
    
    navigate("/databasedisplay", { state: { consoleName: formData.consoleName } });
  };

  return (
    <div className="wrapper">
      <h2>So you want to create a database for a new console?</h2>

      <p>We're going to need some information about the console to create your database. Please enter it in the fields below.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="consoleName">Console Name:</label>
          <input
            type="text"
            id="consoleName"
            name="consoleName"
            placeholder="Console Name here"
            value={formData.consoleName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="releaseYear">Release Year:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            placeholder="Release year"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="manufacturer">Manufacturer:</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
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

export default CreateConsole;