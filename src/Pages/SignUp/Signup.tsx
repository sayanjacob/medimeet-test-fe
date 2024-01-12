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
        <div className="container-fluid row signup pt-3">
            <div className="col-lg-6 px-5 py-4  m-auto">
                <h2 className="signup-heading">Signup</h2>
                <form className="signup-form">
                    <div className="form-group my-1">
                        <label htmlFor="name" className="label">
                            Name:
                        </label>
                        <input type="text" id="name" name="name" className="form-control input-field" onChange={handleChange} />

                    </div>
                    <div className="form-group my-1">
                        <label htmlFor="email" className="label">
                            Email:
                        </label>
                        <input type="email" id="email" name="email" className="form-control input-field" onChange={handleChange} />

                    </div>
                    <div className="form-group mt-1 mb-3">
                        <label htmlFor="password" className="label">
                            Password:
                            </label>
                            <input type="password" id="password" name="password" className="form-control input-field" onChange={handleChange} />
                       
                    </div>
                    <button type="button" className="btn btn-login" onClick={handleSignup}>
                        Sign up
                    </button>
                </form>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-0 col-sm-none">
                {/* Include your image here */}
                <img src="path/to/your/image.jpg" alt="User" className="img-fluid" />
            </div>
        </div>


    );
};
export default Signup;
