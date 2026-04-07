import React, {useState} from 'react'
import {Heart} from "lucide-react";
import {Link} from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { User } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { UserCog } from "lucide-react";
import{useNavigate} from "react-router-dom";

function StaffPortal() {
    const [navB  ,setNavB  ] = useState(false);
    const navigate = useNavigate();

    window.scrollTo({
            top: 0,
            behavior: "smooth"
        }

    );

    return (
        <div>
            <div className="box1">
                <div className="logo">
                    <div className="icon">
                        <Heart color="white" size={18} />
                    </div>
                    <h1>CareConnect</h1>
                </div>

                <Link to={"/"}>
                    <button className={"home-button"} style={{color:"#6B7280"}}>Home</button>

                </Link>
                <Link to={"/patientLogin"}>
                    <button className={"nav-button"} onClick={()=>{
                        setNavB(false);
                    }}>Log in</button>

                </Link>



                <Link to={"/patientRegister"}>
                    <button className={"nav-button"} style={{left:'1000px'}} onClick={()=>{
                        setNavB(true);
                    }}>Get Started</button>

                </Link>


                {navB ? (
                    <Link to={"/patientRegister"}>
                        <button className={"nav-button"} style={{left:'1000px',backgroundColor:'#3B82F6',color:'white'}}>Get Started</button>

                    </Link>


                ):(
                    <button className={"nav-button"} style={{ backgroundColor:'#3B82F6',color:'white'}}>Log in</button>
                )}

            </div>
            <div className="box16" style={{
                display:"initial",

            }}>
                <div className={"create-portalbox1"}>
                    <h1> Welcome to Staff Portal</h1>
                    <p> Please select your role bellow to access the secure management environment</p>

                </div>
                <div className={"create-portalbox2"}>

                    <button className={"cards"} onClick={()=>{
                        navigate("/patientLogin");
                    }}>

                        <div style={{
                            backgroundColor: "#eaf2ff",
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position:"relative",
                            bottom: "80px",
                            left: "45px",
                        }}>
                            <LayoutGrid size={48} color="#3b82f6" />

                        </div>
                        <div className={"card-header"}>
                            <h3>Patient</h3>

                        </div>
                        <p style={{
                            position:"absolute",
                            bottom:"90px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            color:"#6B7280",
                        }

                        } >
                            View your health history and book visits
                        </p>
                        <div className={"card-body"}>
                            <p style={{
                                fontFamily:"sans-serif",
                                fontSize:"14px",
                                fontWeight:"bold",
                                color:"white",

                            }} >Continue</p>

                        </div>



                    </button>
                    <button className={"cards"} onClick={()=>{
                        navigate("/doctorLogin");
                    }}>
                        <div style={{
                            backgroundColor: "#dcfce7",
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position:"relative",
                            bottom: "80px",
                            left: "45px",
                        }}>
                            <Stethoscope size={48} color="#3b82f6" />
                        </div>
                        <div className={"card-header"}>
                            <h3>Doctor</h3>

                        </div>
                        <p style={{
                            position:"absolute",
                            bottom:"90px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            color:"#6B7280",
                        }

                        }>
                            Access patient record and schedules
                        </p>
                        <div className={"card-body"}>
                            <p style={{
                                fontFamily:"sans-serif",
                                fontSize:"14px",
                                fontWeight:"bold",
                                color:"white",

                            }}>Continue</p>

                        </div>

                    </button>
                    <button className={"cards"}>
                        <div style={{
                            backgroundColor: "#eaf2ff",
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position:"relative",
                            bottom: "80px",
                            left: "45px",
                        }}>
                            <User size={48} color="#3b82f6" />
                        </div>
                        <div className={"card-header"}>
                            <h3>Receptionist</h3>

                        </div>
                        <p style={{
                            position:"absolute",
                            bottom:"90px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            color:"#6B7280",
                        }

                        }>
                            Manage appointments and front desk tasks
                        </p>
                        <div className={"card-body"}>
                            <p style={{
                                fontFamily:"sans-serif",
                                fontSize:"14px",
                                fontWeight:"bold",
                                color:"white",

                            }}>Continue</p>

                        </div>

                    </button>
                    <button className={"cards"}>
                        <div style={{
                            backgroundColor: "#dcfce7",
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position:"relative",
                            bottom: "80px",
                            left: "45px",
                        }}>
                            <UserCog size={48} color="#3b82f6" />
                        </div>
                        <div className={"card-header"}>
                            <h3>Adminstrator</h3>

                        </div>
                        <p style={{
                            position:"absolute",
                            bottom:"90px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            color:"#6B7280",
                        }

                        }>
                            Configure system settings,users and hospital reports
                        </p>
                        <div className={"card-body"}>
                            <p style={{
                                fontFamily:"sans-serif",
                                fontSize:"14px",
                                fontWeight:"bold",
                                color:"white",

                            }}>Continue</p>

                        </div>

                    </button>

                </div>





            </div>
            <div className={'box13'} style={{marginTop:"550px"}}>
                <div className={"box14"}>
                    <div className="logo" style={{position:"relative",right:"80px",}}>
                        <div className="icon">
                            <Heart color="white" size={18} />
                        </div>
                        <h1>CareConnect</h1>
                    </div>
                    <p>Revolutionizing healthcare access with technology.Connect with care anytime,anywhere.</p>
                </div>
                <div className={"box14"}>
                    <h4>PATIENTS</h4>
                    <p>Log in</p>
                    <p>Register</p>
                    <p>My Dashboard</p>

                </div>
                <div className={"box14"}>
                    <h4>SUPPORT</h4>
                    <p>Help Center</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
                <div className={"box14"}>
                    <h4>STAFF</h4>
                    <p>Admin Sign in</p>
                    <p>System Status</p>

                </div>

            </div>
            <div className={'box15'} style={{top:"840px",left:"10px"}}>
                <p>2026 @PMT.All rights reserved</p>

            </div>


        </div>



    )
}
export default StaffPortal;