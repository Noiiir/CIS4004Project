import React from 'react';
import '../SiteStyles.css';

const DatabaseSignup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="wrapper">
      <div>Welcome to the sign up page!</div>
      <p>Please input your information below.</p>
      <p id="error-message"></p>
      
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Blahblahblah@blah.com" required />
        </div>
        {/* Add other form fields similarly */}
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default DatabaseSignup;