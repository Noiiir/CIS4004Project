import React, { useState } from "react";
import "../SiteStyles.css"; 
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return(
        <div className="wrapper">
        <h2>Hello and welcome to the Video Game Database!</h2>
        <p>
          Please click on the button below to get started with cataloging or click on 
          "About our site" to learn more about our purpose.
        </p>
  
        <button onClick={() => navigate("/gamecopiesfront")}>Videogame Database</button>
        <button onClick={() => navigate("/about")}>About our site</button>
      </div>
    );
};

export default HomePage;

