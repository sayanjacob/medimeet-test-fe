
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import Navbar from "../../Components/Nav/Navbar";

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState('')

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        user_type: "patient",  // Default to patient
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(response)


            if (response.ok) {
                // Redirect to the main homepage based on user type
                const { user_type } = formData;
                if (user_type === "patient") {
                    sessionStorage.setItem('user', "username");
                    navigate("/booking");
                } else if (user_type === "doctor") {
                    navigate("/doctorhome");
                }
            } else {
                // Handle errors
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    return (
        <div className="container-fluid row login">
            <div className="col-6 px-5 m-auto">
                <h1 className="login-heading">Login</h1>
                <form className="login-form">
                    <div className="form-group my-1">
                        <label htmlFor="email" className="label">Email:</label>
                        <input placeholder="Email" type="email" id="email" name="email" className="form-control input-field" onChange={handleChange} />
                    </div>
                    <div className="form-group my-1">
                        <label htmlFor="password" className="label">Password:</label>
                        <input type="password" id="password" name="password" className="form-control input-field" onChange={handleChange} />
                    </div>
                    <div className="form-group mt-1 mb-3">
                        <label htmlFor="userType" className="label">User Type:</label>
                        <select id="userType" name="user_type" className="form-control input-field" onChange={handleChange}>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <button type="button" className="btn btn-login" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
            <div className="col-6">
                image
            </div>
        </div>



    )
}

export default Login


