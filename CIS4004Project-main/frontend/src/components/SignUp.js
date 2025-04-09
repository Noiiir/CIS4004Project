import React, { useState } from "react";
import "../SiteStyles.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempted with:", formData);
    // Add actual signup logic here
  };

  return (
    <div className="wrapper">
      <h1>Welcome to the Sign-Up Page!</h1>
      <p>Please input your information below.</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Blahblahblah@blah.com" required value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="username" required value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="password" required value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input type="password" id="confirmpassword" name="confirmpassword" placeholder="confirm password" required value={formData.confirmpassword} onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
