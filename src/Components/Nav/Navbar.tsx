import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('')
  const handleRegisterClick = () => {
    navigate('/signup');
  };
  useEffect(() => {
    const userr = sessionStorage.getItem('user');
    setUser(userr)
  }, [])

  const handleLoginClick = () => {
    navigate('/login');

  };
  const handleLogout = () => {
    const response = axios.post("http://127.0.0.1:5000/logout")
    sessionStorage.removeItem('user')
    navigate('/')

  }

  return (
    <nav className="navbar navbar-expand-lg pt-3 ">
      <div className="container">
        <Link to='/' className="navbar-brand">
          MediMeet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user === null && (<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-home me-2" onClick={handleRegisterClick}>
                SignUp
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-home" onClick={handleLoginClick}>
                Login
              </button>
            </li>
          </ul>)}
          {user && (<>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button onClick={handleLogout} className='btn btn-home'>logout</button>
              </li>
            </ul>
          </>)}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
