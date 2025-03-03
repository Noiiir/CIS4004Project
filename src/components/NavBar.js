import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "10px 20px",
      alignItems: "center",
      backgroundColor: "var(--accent-color)",
      color: "white"
    }}>
      <div onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        Video Game Cataloger
      </div>
      
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span>Welcome, {user.name}</span>
          <button 
            onClick={() => logout({ returnTo: window.location.origin })}
            style={{ backgroundColor: "white", color: "var(--accent-color)" }}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;