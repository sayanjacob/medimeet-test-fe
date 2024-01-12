import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to the home page on successful signup
        navigate("/");
      } else {
        // Handle errors
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Signup</h1>
      <form className="signup-form">
        <label className="form-group">
          <span className="label">Name:</span>
          <input type="text" name="name" className="input-field" onChange={handleChange} />
        </label>
        <label className="form-group">
          <span className="label">Email:</span>
          <input type="email" name="email" className="input-field" onChange={handleChange} />
        </label>
        <label className="form-group">
          <span className="label">Password:</span>
          <input type="password" name="password" className="input-field" onChange={handleChange} />
        </label>
        <button type="button" className="signup-btn" onClick={handleSignup}>
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
