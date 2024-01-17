import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './patientinfo.css'

const Booking_success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    useEffect(() => {

        const timerId = setTimeout(() => {
            // Replace '/home' with the actual path of your home page
            if (status === "201") {
                navigate('/');
            }
            else {
                navigate('/booking')
            }

        }, 10000); // 10000 milliseconds = 10 seconds

        // Clear the timer if the component unmounts before it expires
        return () => clearTimeout(timerId);
    }, []);
    return (
        <div className='container acknoldg my-5 mx-auto'>
            {status === "201" ? (<div className="row d-flex flex-row justify-content-center text-center">
                <img className="bookingconfrm" src="https://cdn.dribbble.com/users/147386/screenshots/5315437/media/64a3a80eb03d6fe459abd7e7c1d889f9.gif" width={20} alt="" />
                <h5>Appointment Confirmed for {sessionStorage.getItem('user')}!</h5>

            </div>) :
                (<div className="row d-flex flex-row justify-content-center text-center">
                    <img className="bookingconfrm" src="" width={20} alt="image placeholder" />
                    <h5>Appointment Failed for {sessionStorage.getItem('user')}!</h5>

                </div>)}

        </div>
    )
}

export default Booking_success