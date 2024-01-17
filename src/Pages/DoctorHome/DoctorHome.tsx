import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Nav/Navbar';

const DoctorHome = () => {
  const [doctorName, setDoctorName] = useState('');
  const navigate = useNavigate();

  const handleFindBookingClick = async () => {
    if (doctorName) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/doctor/appointments?doctor_name=${doctorName}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Appointments data:', data); // Log the fetched data
          // Navigate to the Booking page with the appointments data
          navigate('/booking', { state: { appointments: data.appointments, doctorName } });
        } else {
          console.error('Failed to fetch appointments:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    } else {
      console.error('Please enter a doctor name');
    }
  };

  return (
    <div>
        <Navbar/>
      
      <div className="doctorhomeContainer">
        <h2>Welcome to Your Doctor Homepage!</h2>

        <label>
          Doctor's Name:{' '}
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </label>

        <button className="find-booking-btn" onClick={handleFindBookingClick}>
          Find Booking
        </button>

        {/* Add more components or content as needed */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DoctorHome;
