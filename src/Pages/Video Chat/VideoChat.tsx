// VideoChat.jsx
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const VideoChat = () => {
  const videoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your backend URL

    const room = 'room'; // Set your room name

    // Emit 'join' event when the page loads to join the room
    socket.emit('join', { room: room });

    // Request both video and audio tracks
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Set the stream to the video element
        videoRef.current.srcObject = stream;

        // Send both video and audio tracks to the backend with the room parameter
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          socket.emit('offer', { track, room });
        });

        socket.on('offer', (data) => {
          // Handle offer from the other user if needed
        });

        socket.on('answer', (data) => {
          // Handle answer from the other user if needed
        });

        socket.on('ice_candidate', (data) => {
          // Handle ice candidate from the other user if needed
        });
      })
      .catch((error) => {
        console.error('Error accessing camera and microphone:', error);
      });

    return () => {
      // Clean up logic if component unmounts
      socket.disconnect();
    };
  }, []);
  const handleLogout = () => {
    const response = axios.post("http://127.0.0.1:5000/logout")
    sessionStorage.removeItem('user')

    navigate('/')

  }
  return (
    <div className='container videochat'>
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

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item p-0 m-0">
                <p className='text-dark m-auto mx-2 pe-1 '> <img src="src\assets\user.png" width={40} alt="" /> <span className='pe-1'>{sessionStorage.getItem('user')}</span> </p>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className='btn btn-home'>logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="row videoarea">
        <div className="col-10 d-flex flex-row justify-content-center">
          <video  ref={videoRef} autoPlay playsInline muted />
        </div>
        <div className="col-2">

        </div>

      </div>
    </div>
  );
};

export default VideoChat;
