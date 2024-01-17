import Navbar from "../../Components/Nav/Navbar";
import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';
import './Booking.css'
import VideoChat from "../Video Chat/VideoChat";

const Booking = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchDoctors('http://localhost:5000/all-doctors');
  }, []);

  const fetchDoctors = async (endpoint: string) => {
    try {
      const response = await axios.get(endpoint);
      const doctorsData = response.data;
      const doctorsArray = Array.isArray(doctorsData) ? doctorsData : [];
      setDoctors(doctorsArray);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearch = async () => {
    if (selectedCategory && selectedDate) {
      try {
        const endpoint = 'http://localhost:5000/doctors';

        const response = await axios.get(endpoint, {
          params: {
            specialized_category: selectedCategory,
            selected_date: selectedDate.toISOString(),
          },
        });

        const doctorsData = response.data.doctors;
        const doctorsArray = Array.isArray(doctorsData) ? doctorsData : [];

        setDoctors(doctorsArray);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    } else {
      fetchDoctors('http://localhost:5000/doctorsn');
      console.log('Please select both specialized category and date.');
    }
  };

  const handleSelectDate = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const handleBookAppointment = (doctorId) => {
    // Redirect to the patient info page with the doctor ID
    navigate(`/patientinfo?doctorId=${doctorId}`);
  };


  return (
    <div className="container-fluid m-auto">
      <Navbar />
      <div className="doctor-list-container">
        <div className="row pt-4 m-0">
          
          <h2 className="doctor-list-title">Take Appointment Seamlessly</h2>
        </div>

        <div className="col px-5 ">
          <div className="row justify-content-center search-dropdown py-1">
            <div className="col-4 ">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Specialized Category</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
              </select>
            </div>
            <div className="col-2 px-2 mx-3">
              <DatePicker
                selected={selectedDate}
                onChange={handleSelectDate}
                className="form-control custom-date-picker"
              />
            </div>
            <div className="col-2">
              <button className="btn search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className="row">
            {doctors.map((doctor) => (
              <div key={doctor.doctor_id} className="col-md-6 m-0 p-0">
                <div className="doctor-item m-2">
                  <div className="row m-2 py-1">
                    <div className="col-2 px-1 py-2 m-0">
                      <img src="src\assets\doctor.png" height={80} alt="" srcSet="" />
                    </div>
                    <div className="col-5 m-auto">
                      <p className="doctor-name p-0 m-0">{doctor.name}</p>
                      <p className="doctor-details p-0 m-0">{doctor.specialized_category}</p>
                      <p className="doctor-details">{`Rating: ${doctor.rating}`} <span className="ps-4">{`Price: ${doctor.price}`}</span></p>
                      <p className="doctor-details"></p>
                    </div>
                    <div className="col-4 text-end m-auto">
                      <button
                        className="appointment-button px-3 py-2"
                        onClick={() => handleBookAppointment(doctor.doctor_id)}
                      >
                        Book an Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking




