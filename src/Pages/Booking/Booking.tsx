import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Nav/Navbar";


const Booking = () => {
    const navigate=useNavigate();
function handleOnClick(){
    navigate("/patientinfo");

}
  return (
    <div className="container my-2 m-auto">
      <Navbar isLoggedIn={true}/>
        <h3>Select doc</h3>
        <button className="btn btn-home" onClick={handleOnClick}>Add details</button>
    </div>
  )
}

export default Booking