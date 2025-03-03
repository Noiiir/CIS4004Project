import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8fmmuf8r7dmhl7b1.us.auth0.com"
      clientId="FoPDQ8vskgHk9R3kMeztmJrjo05690sg"
      authorizationParams={{
        redirect_uri: window.location.origin,
        //audience: "YOUR_API_IDENTIFIER", // If you have a backend API
      }}
    >
        <App />
    </Auth0Provider>
  </React.StrictMode>
);


