import Navbar from "../../Components/Nav/Navbar"
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="navbg1">

            </div>

            <div className="blur">
                <Navbar />
                <div className="row m-0 p-0 pt-4">
                    <div className="col-6 px-5">
                        <div className="px-4 pt-3">
                            <div className="container py-2 px-2">
                                <div className="row m-0 p-0 mt-4 mb-1 ">
                                    <div className="col-sm-8 py-1 m-0">
                                        <h5 className="m-auto m-0"><img src="src\assets\consultation.png" alt="" srcSet="" width={35} /> <span className="ps-1  my-1 m-0">Found your Doctor ?</span> </h5>
                                    </div>
                                    {/* <div className="col-sm-6 m-auto">
                            <p className="help m-auto pe-5 ">Need help ?
                            </p>
                        </div> */}
                                </div>
                                <div className="row m-0 mb-4">
                                    <h2 className="pt-2">How about <span className=" px-1 title">MediMeet</span> : Connecting Patients with the Right Doctors?</h2>
                                    <p className="pt-1">Book appointments with skilled doctors for personalized healthcare.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 m-auto align-content-center justify-content-center align-self-center">
                        {/* <img
                        className=""
                         src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                         alt=""
                         style={{'width':"40vw",borderRadius:'10px'}} /> */}
                         image placeholder
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home