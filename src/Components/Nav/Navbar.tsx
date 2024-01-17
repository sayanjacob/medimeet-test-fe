import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('')
  const [type, setType] = useState('')

  const handleRegisterClick = () => {
    navigate('/signup');
  };
  useEffect(() => {
    setUser(sessionStorage.getItem('user'))
    setType(sessionStorage.getItem('type'))
  }, [])

  const handleLoginClick = () => {
    navigate('/login');

  };
  const handleVideoConnect = () => {
    navigate('/videoConnect')
  }
  const handleLogout = () => {
    const response = axios.post("http://127.0.0.1:5000/logout")
    sessionStorage.removeItem('user')
    setUser('')
    navigate('/')

  }

  return (
    <nav className="navbar navbar-expand-lg pt-3 ">
      <div className="container">
        <Link to='/' className="navbar-brand">
          <img src="src\assets\logo.png" height={30} alt="" />
          <span className='ps-2'>MediMeet</span>

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
              { type === 'doctor' 

              ? (<li className="nav-item p-0 m-0 " onClick={handleVideoConnect}>
                <p className='text-dark m-auto mx-2 pe-1 py-2'> <img src="src\assets\video-call.png" width={25} alt="" /><span className="ps-2">Connect With Patient</span></p>
              </li>) 

              : (<li className="nav-item p-0 m-0 " onClick={handleVideoConnect}>
                <p className='text-dark m-auto mx-2 pe-1 py-2'> <img src="src\assets\video-call.png" width={25} alt="" /><span className="ps-2">Connect With Doctor</span></p>
              </li>)}

              <li className="nav-item p-0 m-0">
                <p className='text-dark m-auto mx-2 pe-1 '> <img src="src\assets\user.png" width={40} alt="" /> <span className='pe-1'>{user}</span> </p>
              </li>
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
