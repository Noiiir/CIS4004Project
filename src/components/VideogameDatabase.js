import React, { useEffect, useState } from "react";
import "../SiteStyles.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, isLoading, error } = useAuth0();
  const [isNewUser, setIsNewUser] = useState(false);

  
  const saveUserToDatabase = async (userData) => {
    try {
     
      const response = await fetch('https://your-api-endpoint.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth0Id: userData.sub,
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      
    }
  };

  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, isLoading, user, error });
    
    
    if (isAuthenticated && !isLoading && user) {
      
      const lastLoginAt = localStorage.getItem('lastLoginAt');
      const currentLoginAt = user.updated_at || new Date().toISOString();
      
      
      if (!lastLoginAt || lastLoginAt !== currentLoginAt) {
        
        localStorage.setItem('lastLoginAt', currentLoginAt);
        
        
        if (user.created_at && user.updated_at && 
            Math.abs(new Date(user.created_at) - new Date(user.updated_at)) < 1000 * 60 * 5) {
          
          console.log("Detected new user signup", user);
          setIsNewUser(true);
          saveUserToDatabase(user);
        } else {
          
          console.log("Existing user login");
        }
      }
      
      
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

      <h2>Login or Sign Up</h2>

      <div className="oauth-button-container" style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
        <button 
          onClick={() => loginWithRedirect({
            
            screen_hint: 'signup', 
          })}
          style={{ 
            backgroundColor: "var(--accent-color)", 
            color: "white", 
            padding: "12px 24px",
            fontSize: "16px"
          }}
        >
          Log In / Sign Up
        </button>
      </div>

      <p>By logging in or signing up, you agree to our terms of service and privacy policy.</p>
    </div>
  );
};

export default Login;