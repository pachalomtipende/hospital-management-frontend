import React, {useState} from 'react'
import {Heart, Shield} from "lucide-react";
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
            <div className="box16">
                <div className={"doc-login-box1"} style={{
                    height:"600px",
                    width:"400px",
                    position:"relative",
                    bottom:"80px",
                    borderRadius:"5px",
                    boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",
                }}>
                    <h2 style={{
                        textAlign:"center",
                        fontFamily:"sans-serif",
                        color:"#1F2937"
                    }}>Doctor Access</h2>
                    <p style={{
                        textAlign:"center",
                        fontFamily:"sans-serif",
                        color:"#6B7280",
                        fontSize:"13px",
                        position:"relative",
                        bottom:"10px",
                    }}> Secure gateway for doctors ,nurses and  clinical specialists</p>
                    <div className={"doc-login-box2"} style={{
                        height:"60px",
                        width:"400px",
                       top:"20px",
                        position:"relative",




                    }}>
                        <p style={{
                            textAlign:"left",
                            fontFamily:"sans-serif",
                            color:"#1F2937",
                            fontSize:"13px",
                            fontWeight:"bold",
                            position:"relative",
                            bottom:"10px",
                            left:"30px",

                        }}> Provider Email or Username</p>
                        <input type={"text"} style={{
                            position:"relative",
                            bottom:"15px",
                            height:"30px",
                            width:"340px",
                            left:"30px",
                            border:"none",
                            outline:"none",
                            borderRadius:"5px",
                            boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                        }}/>

                    </div>
                    <div className={"doc-login-box2"} style={{
                        height:"60px",
                        width:"400px",
                        top:"20px",
                        position:"relative",




                    }}>
                        <p style={{
                            textAlign:"left",
                            fontFamily:"sans-serif",
                            color:"#1F2937",
                            fontSize:"13px",
                            fontWeight:"bold",
                            position:"relative",
                            bottom:"10px",
                            left:"30px",

                        }}> Password</p>
                        <input type={"password"} style={{
                            position:"relative",
                            bottom:"15px",
                            height:"30px",
                            width:"340px",
                            left:"30px",
                            border:"none",
                            outline:"none",
                            borderRadius:"5px",
                            boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                        }}/>

                    </div>
                    <div className={"doc-login-box2"} style={{
                        height:"60px",
                        width:"400px",
                        top:"20px",
                        position:"relative",
                    }}>
                        <p style={{
                            textAlign:"left",
                            fontFamily:"sans-serif",
                            color:"#1F2937",
                            fontSize:"13px",
                            fontWeight:"bold",
                            position:"relative",
                            bottom:"10px",
                            left:"30px",

                        }}>Active Facility</p>
                        <input type={"text"} style={{
                            position:"relative",
                            bottom:"15px",
                            height:"30px",
                            width:"340px",
                            left:"30px",
                            border:"none",
                            outline:"none",
                            borderRadius:"5px",
                            boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                        }}/>

                    </div>
                    <p style={{
                        textAlign:"left",
                        fontSize:"12px",
                        marginTop:"10px",
                        marginLeft:"30px",
                        color:"#6B7280"
                    }}>*your dashboard will automatically  sync with the facilities records</p>
                    <div className={"doc-login-box3"} style={{
                        height:"80px",
                        width:"345px",
                        position:"relative",
                        left:"30px",
                        backgroundColor:"#F3F4F6",
                        marginTop:"20px",
                        borderRadius:"5px",
                        boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                    }}>
                        <Shield color={"#3B82F6"} size={20} style={{
                            position:"relative",
                            top:"10px",
                            left:"10px",

                        }}/>
                        <p style={{
                            fontFamily:"sans-serif",
                            color:"",
                            fontSize:"12px",
                            fontWeight:"bold",
                            position:"relative",
                            bottom:"25px",
                            left:"40px",

                        }}>Enhanced Security Active</p>
                        <p style={{
                            fontFamily:"sans-serif",
                            position:"relative",
                            bottom:"30px",
                            left:"40px",
                            fontSize:"10px",
                            lineHeight:"1.2",
                            color:"#6B7280",

                        }}>
                            Standard multi-factor authentication(MFA) will be
                            required <br/>upon successful credential verification
                        </p>


                    </div>
                    <button className={"doc-login-btn"} style={{
                        position:"relative",
                        height:"40px",
                        width:"345px",
                        left:"30px",
                        top:"15px",
                        borderRadius:"5px",
                        boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",
                        border:"none",
                        backgroundColor:"#3B82F6",
                        color:"white",
                        fontWeight:"bold",
                        cursor:"pointer",
                    }}> Doctor Access</button>
                    <div style={{
                        position:"relative",
                        width:"345px",
                        borderTop:"1px solid #6B7280",
                        top:"30px",
                        left:"30px",
                    }}><p style={{
                        fontFamily:"sans-serif",
                        fontSize:"10px",
                        position:"relative",
                        fontWeight:"bold",
                        textAlign:"center"
                    }}>NOT REGISTERED DOCTOR?</p> </div>
                    <Link to={"/doctorRegister"}>
                        <button className={"doc-login-btn"} style={{
                            position:"relative",
                            height:"40px",
                            width:"345px",
                            left:"30px",
                            top:"30px",
                            borderRadius:"5px",
                            boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",
                            cursor:"pointer",
                            backgroundColor:"transparent",
                            color:"#1F2937",
                            fontWeight:"bold",
                            border:"1px solid #6B7280",
                        }}> Create Doctor Account</button>

                    </Link>



                </div>





            </div>
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