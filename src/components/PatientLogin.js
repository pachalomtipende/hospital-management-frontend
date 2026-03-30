import React, {useState} from 'react'
import {Heart} from "lucide-react";
import {Link} from "react-router-dom";


function PatientLogin() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    const [navB  ,setNavB  ] = useState(false);
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")



    const LogIn = async () => {
        const response = await fetch("http://localhost:3000/api/login",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                 patient : {
                     email: email,
                     password: password,
                 }

            })

        });
        const data = await response.json()
        alert(data.message)
        if(data.error){
            alert(data.error)

        }

    }


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

                <button className={"nav-button"} onClick={()=>{
                    setNavB(false);
                }}>Log in</button>

                <Link to={"/patientRegister"}>
                    <button className={"nav-button"} style={{left:'1000px',}} onClick={()=>{
                        setNavB(true);
                    }} >Get Started</button>

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
                <div className={"box17"} style={{height:"450px", bottom:"170px" ,width:"700px"}}>
                    <img src="/images/log.jpeg" alt="Patient 1"  style={{width:'100%',height:'450px',boxShadow:"0px 0px 15px rgba(0, 0, 0, 0.08)"}}/>
                </div>
                <div className={"box17"} style={{bottom:"170px",height:"450px" ,width:"600px",boxShadow:"none"}}>
                    <div className={"box26"} style={{
                        height:"415px",

                        width:'400px',
                        position:"absolute",
                        left:"90px",
                        top:"30px"
                    }}>
                        <h2> Welcome Back</h2>
                        <p> Enter your credentials to access your patient portal</p>
                        <div className={"box27"}>
                            <p>Email Address</p>
                            <input type={"text"} className={"email-input"}
                                   value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"box27"}>
                            <p>Password</p>
                            <p style={{
                                position:"absolute",
                                top:"140px",
                                left:"290px",
                                color:"#3B82F6",
                                cursor:"pointer"
                            }
                            }> Forget password</p>
                            <input type={"password"} className={"email-input"}
                                   value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                         <button className={"login-dash"} onClick={LogIn} >
                             Login to Dashboard
                         </button>
                        <div style={{
                            position:"relative",
                            width:"100%",
                            height:"30px",
                            top:"30px",
                            border:"1px solid #6B7280",
                            borderBottom:"none",
                            borderLeft:"none",
                            borderRight:"none"



                        }}>
                            <p style={{
                                position:"relative",
                                top:"-5px",
                                fontSize:"10px",
                                fontWeight:"bold",
                            }}> NEW TO CARECONNECT</p>

                        </div>
                        <Link to={"/patientRegister"}>
                            <button className={"login-dash"} style={{
                                top:"30px",
                                backgroundColor:'transparent',
                                border: "none",
                                color:"#1F2937"
                            }} >
                                Create Patient Account
                            </button>
                        </Link>
                        <Link to={"/staffPortal"}>
                            <button className={"login-dash"} style={{
                                top:"50px",
                                backgroundColor:'#3B82F6',
                                border: "none",
                                color:"white",

                            }} >
                                Staff Login
                            </button>

                        </Link>

                    </div>
                </div>


            </div>
            <div className={'box13'} style={{marginTop:"490px"}}>
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
            <div className={'box15'} style={{top:"770px",left:"10px"}}>
                <p>2026 @PMT.All rights reserved</p>

            </div>

        </div>
    )
}
export default PatientLogin;