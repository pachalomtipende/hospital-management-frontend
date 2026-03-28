import React, {useState} from 'react'
import {Heart} from "lucide-react";
import {Link} from "react-router-dom";

function DoctorLogin() {

    const [navB  ,setNavB  ] = useState(true);
    return(
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

                <button className={"nav-button"} onClick={()=>{
                    setNavB(false);
                }}>Log in</button>

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
            <div className="box16"></div>
            <div className={'box13'} style={{marginTop:"820px"}}>
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
            <div className={'box15'} style={{top:"1099px",left:"10px"}}>
                <p>2026 @PMT.All rights reserved</p>

            </div>


        </div>
    )
}
export default DoctorLogin;