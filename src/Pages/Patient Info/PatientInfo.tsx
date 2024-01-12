// Import the necessary dependencies
import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import './patientinfo.css';
import Navbar from '../../Components/Nav/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientInfo = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [patientName, setPatientName] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [reasonForConsultation, setReasonForConsultation] = useState('');
    const [medicalCondition, setMedicalCondition] = useState('');
    const [medication, setMedication] = useState('');
    const [allergies, setAllergies] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const navigate = useNavigate();
    const { doctorId } = useParams();
    const [selectedDoctor, setSelectedDoctor] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all-doctors');
                const doctors = response.data.doctors; // Assuming the response is an array of doctors
                doctors.forEach((doc) => {
                    if (parseInt(doc.doctor_id) === parseInt(doctorId)) {
                        setSelectedDoctor(doc);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, [doctorId]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/patient/appointment', {
                patient_name: patientName,
                age: parseInt(age),
                appointment_time: appointmentTime,
                doctor_name: selectedDoctor,
            });

            console.log(response.data);  // Log the response for debugging

            // Handle success, e.g., show a success message to the user
            navigate('/paymentform'); // Redirect to the payment form
        } catch (error) {
            console.error('Error creating appointment:', error);
            // Handle error, e.g., show an error message to the user
        }
    };
    useEffect(() => {


        const currentDate = new Date();
        const formattedTime = formatDateTime(currentDate);
        setAppointmentTime(formattedTime);
    }, []);
    const formatDateTime = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date)
            const formattedTime = formatDateTime(date);
            console.log(formatDateTime)
            setAppointmentTime(formattedTime);
        }
    };




    return (
        <div className='details' >
            <div className='navbg '>
                <Navbar />
            </div>
            <div className="doc m-0 p-0 py-2">
                <div className="row my-1 d-flex flex-row justify-content-start ">
                    <div className="col-2 ">
                        image
                    </div>
                    <div className="col-4 m-auto ">
                        <p className="doctor-name p-0 m-0">{selectedDoctor.name}</p>
                        <p className="doctor-details p-0 m-0">{selectedDoctor.specialized_category}</p>
                        <p className="doctor-details">{`Price: ${selectedDoctor.price}`}</p>
                    </div>
                    <div className="col-4">
                        
                        {appointmentTime}
                    </div>
                </div>

            </div>
            <DatePicker
                 
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy hh:mm aa"
                    className='form-control custom-date-picker'
                />


            <div className="container-fluid m-auto px-5 pt-2 pb-2">
                <div className="row m-0 p-0 my-2">
                    <h4 className='col-11'>Patient Information</h4>
                    {weight !== '' && (<button type="submit" className="col-1 btn btn-submit">
                        Save
                    </button>)}
                </div>
                
                <form onSubmit={handleFormSubmit}>

                    <div className='basic-details m-0 p-0 px-3 py-3 my-1'>

                        <h5>Basic Details</h5>
                        <div className="row m-0 p-0 py-2 my-1">
                            <div className="col-md-8 form-group">
                                <label className='pb-2' htmlFor="patientName">Patient Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="patientName"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-2 form-group">
                                <label className='pb-2' htmlFor="age">Age:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-2 form-group">
                                <label className='pb-2' htmlFor="gender">Gender:</label>
                                <select
                                    className="form-control"
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="row m-0 p-0 py-2 my-1">
                            <div className="col-md-3 form-group">
                                <label className='pb-2' htmlFor="mobile">Mobile:</label>
                                <input
                                    type="tel" // Assuming it's for a mobile number
                                    className="form-control"
                                    id="mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3 form-group">
                                <label className='pb-2' htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label className='pb-2' htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} // Corrected state function
                                    required
                                />
                            </div>
                        </div>
                    </div>


                    <div className="additional-details m-0 p-0 px-3 py-3 mt-4">
                        <h5>Additional Details</h5>
                        <div className="row m-0 p-0 py-2 my-1">
                            <div className="col-md-6 form-group">
                                <label className='pb-2' htmlFor="reasonForConsultation">Reason for consultation:</label>
                                <textarea
                                    className="form-control"
                                    id="reasonForConsultation"
                                    value={reasonForConsultation}
                                    onChange={(e) => setReasonForConsultation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label className='pb-2' htmlFor="medicalCondition">Medical Condition / Purpose / Symptoms:</label>
                                <textarea
                                    className="form-control"
                                    id="medicalCondition"
                                    value={medicalCondition}
                                    onChange={(e) => setMedicalCondition(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row m-0 p-0 py-2 my-1">
                            <div className="col-md-6 form-group">
                                <label className='pb-2' htmlFor="medication">Ongoing Medication / Recent Surgeries:</label>
                                <textarea
                                    className="form-control"
                                    id="medication"
                                    value={medication}
                                    onChange={(e) => setMedication(e.target.value)}
                                    required
                                />
                            </div>
                            <div className=" col-md-6 form-group">
                                <label className='pb-2' htmlFor="allergies">Allergies:</label>
                                <textarea
                                    // placeholder='Allergies(if any)'
                                    className="form-control"
                                    id="allergies"
                                    value={allergies}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row m-0 p-0 py-2 my-1">
                            <div className="col-md-2 form-group">
                                <label className='pb-2' htmlFor="height">Height (in cm):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                            <div className=" col-md-2 form-group">
                                <label className='pb-2' htmlFor="weight">Weight (in kgs):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>
                        </div>


                    </div>

                </form >
            </div >
        </div>
    );
}

export default PatientInfo;
