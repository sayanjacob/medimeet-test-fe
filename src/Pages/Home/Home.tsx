import Navbar from "../../Components/Nav/Navbar"
import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home px-4">
                <div className="container py-2 px-2">
                    <div className="row m-0 p-0 ">
                        <div className="col-sm-6 ">
                            <h5 className="m-auto"><img src="src\assets\consultation.png" alt="" srcSet="" width={30} /> Find a Doctor</h5>
                        </div>
                        {/* <div className="col-sm-6 m-auto">
                            <p className="help m-auto pe-5 ">Need help ?
                            </p>
                        </div> */}
                    </div>
                    <div className="row m-0 my-4">
                        <h3 className="pt-2">How about <span className=" px-1 title">MediMeet</span> : Connecting Patients with the Right Doctors?</h3>
                        <p className="pt-1">Book appointments with skilled doctors for personalized healthcare.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home