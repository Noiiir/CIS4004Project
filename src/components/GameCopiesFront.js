import React from "react";
import "../SiteStyles.css";
import { useNavigate } from "react-router-dom";

const GameCopiesFront = () => {
  const navigate = useNavigate();

  const navigateToConsole = (consoleName) => {
    navigate("/databasedisplay", { state: { consoleName } });
  };
  
  return (
    <div className="wrapper">
      <h2>Welcome to the game copies database!</h2>

      <div>
        <p>Here you can catalog all of the physical and digital copies of games that you own.</p>
      </div>

      <div>
        <p>Just click on one of the buttons for a game console below to start cataloging!</p>
      </div>

      <button onClick={() => navigateToConsole("Nintendo Switch")}>Nintendo Switch</button>
      <button onClick={() => navigateToConsole("Playstation 5")}>Playstation 5</button>
      <button onClick={() => navigateToConsole("Xbox Series S")}>Xbox Series S</button>
      <button onClick={() => navigate("/createconsole")}>Add a console</button>
    </div>
  );
};

export default GameCopiesFront;