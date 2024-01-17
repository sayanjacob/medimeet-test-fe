
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import Navbar from "../../Components/Nav/Navbar";
import axios from "axios";

const Login = () => {
    const [errorlogin, setErrorLogin] = useState('')

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
            const response = await axios.post("http://127.0.0.1:5000/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                // Redirect to the main homepage based on user type
                // const { user_type } = formData;
                const user_type = response.data.user_type
                if (user_type === "patient") {
                    sessionStorage.setItem('user', response.data.user_name);
                    sessionStorage.setItem('type', user_type);

                    navigate("/booking");
                } else if (user_type === "doctor") {
                    sessionStorage.setItem('user', response.data.user_name);
                    sessionStorage.setItem('type', user_type);
                    navigate("/doctorhome");
                }
            } else {
                setErrorLogin("Invalid Login Credentials")
                // Handle errors
                console.error("Login failed");
            }
        } catch (error) {
            setErrorLogin("Invalid Login Credentials")
            console.error("Error during login:", error);
        }
    };
    return (
        <div className="container row login my-5 py-5 mx-5">
            <div className="col-6 px-5 m-auto">
                <h3 className="login-heading">Login</h3>
                <form className="login-form">
                    <div className="form-group my-1">
                        <label htmlFor="email" className="label">Email:</label>
                        <input type="email" id="email" name="email" className="form-control input-field" onChange={handleChange} />
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
                    <div className="">
                       <p style={{fontSize:'10px',color:'red',fontWeight:'300'}}>{errorlogin}</p> 
                    </div>
                    <button type="button" className="btn btn-login" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
            <div className="col-6 bg-light">
                {/* <img src="path/to/your/image.jpg" alt="" className="img-fluid" /> */}
                image placeholder
            </div>
        </div>




    )
}

export default Login


