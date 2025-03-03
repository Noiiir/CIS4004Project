import React, { useEffect } from "react";
import "../SiteStyles.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, isLoading, error } = useAuth0();

  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, isLoading, user, error });
    if (isAuthenticated && !isLoading) {
      console.log("Redirecting to home");
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, navigate, user, error]);
  return (
    <div className="wrapper">
      <h1>Hello! Welcome to the Video Game Cataloger!</h1>
      <p>
        This is a website where you can catalog all of the video game consoles, peripherals, 
        and games that you own. Log in below to get started. We hope you enjoy using our site!
      </p>

      <h2>Login</h2>

      <div className="oauth-button-container" style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
        <button 
          onClick={() => loginWithRedirect()}
          style={{ 
            backgroundColor: "var(--accent-color)", 
            color: "white", 
            padding: "12px 24px",
            fontSize: "16px"
          }}
        >
          Log In
        </button>
      </div>

      <p>By logging in, you agree to our terms of service and privacy policy.</p>
    </div>
  );
};

export default Login;