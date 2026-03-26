import React, {useState} from 'react'
import {Heart} from "lucide-react";
import {Link} from "react-router-dom";
import { Calendar, Stethoscope, ShieldCheck } from "lucide-react";


function PatientRegister(){
    const [navB  ,setNavB  ] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    const create = async()=>{
        const response = await fetch("http://localhost:3000/api/create",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                patient: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    date_of_birth: dateOfBirth,
                    password: password,
                    password_confirmation: passwordConfirmation
                }

            })
        });

        const data = await response.json();
        console.log(data);

        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setDateOfBirth("")
        setPassword("")
        setPasswordConfirmation("")
        setPasswordConfirmation("")
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
                <div className={"box17"} style={{width:"300px",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",
                    backgroundColor:"#E6F0FF"}}>

                    <div className={"box18"}><p>
                        join our community
                    </p></div>
                    <div className={"box19"}>
                        <h1>Start Your Heath Journey With</h1>
                        <h1 style={{color:"#3B82F6"}}>careConnect</h1>
                        <p>
                            Create an account to access world class healthcare services,right from your desk

                        </p>

                    </div>
                    <div className={"box20"}>
                        <div className={"box21"}>
                            <Calendar size={20} color="#3B82F6" strokeWidth={1.5}
                                      style={{position:"relative",top:"30px",left:"10px"}} />
                            <h5>
                                Easy scheduling
                            </h5>
                            <p>
                                Book appointments with top-rated specialists <br/> in just few clicks.
                            </p>




                        </div>
                        <div className={"box21"}>
                            <Stethoscope size={20} color="#3B82F6" strokeWidth={1.5}
                                         style={{position:"relative",top:"30px",left:"10px"}} />


                            <h5>
                                System Checker
                            </h5>

                            <p>
                                Log in and monitor your health pattens with our intuitive tracker.
                            </p>


                        </div>
                        <div className={"box21"}>
                            <ShieldCheck size={20} color="#3B82F6" strokeWidth={1.5}
                                         style={{position:"relative",top:"30px",left:"10px"}} />

                            <h5>
                               Secure Records
                            </h5>

                            <p>
                                Your medical data is always safe with us.
                            </p>

                        </div>
                        <div className={"box22"}>
                            <p>trusted by 5+ patients in malawi</p>


                        </div>


                    </div>


                </div>
                <div className={"box17"} style={{borderTopRightRadius:"5px",borderBottomRightRadius:"5px",width:"500px"}}>
                    <div className={"box23"}>
                        <div className={"box24"}>
                            <h4>Create an account</h4>
                            <p>Please enter your details as a patient</p>
                        </div>
                        <div className={"pname"}>
                            <p style={{position:"relative",bottom:"14px"}}>First Name</p>
                            <p style={{position:"relative",bottom:"40px",left:"190px"}}>Last Name</p>
                            <input type={"text"} className={"fname"} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            <input className={"lname"} type={"text"} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>

                        </div>
                        <div className={"pname" } style={{position:"absolute",top:"121px"}}>
                            <p style={{position:"relative",bottom:"14px"}}>Email</p>
                            <input className={"fname"} type={"text"} style={{position:"relative",bottom:"20px",width:"345px"}} value={email} onChange={(e) => setEmail(e.target.value)}/>

                        </div>

                        <div className={"pname" } style={{position:"absolute",top:"190px"}}h>
                            <p style={{position:"relative",bottom:"14px"}}>Password</p>
                            <p style={{position:"relative",bottom:"40px",left:"190px"}}>Confim</p>
                            <input type={"password"} className={"fname"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input className={"lname"} type={"password"} value={passwordConfirmation} onChange={(e)=>{setPasswordConfirmation(e.target.value)}}></input>

                        </div>
                        <div className={"pname" } style={{position:"absolute",top:"259px"}}h>
                            <p style={{position:"relative",bottom:"14px"}}>Phone Number</p>
                            <p style={{position:"relative",bottom:"40px",left:"190px"}}>Date Of Birth</p>
                            <input type={"type"} className={"fname"} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <input className={"lname"} type={"date"} value={dateOfBirth} onChange={(e)=>{setDateOfBirth(e.target.value)}}></input>

                        </div>
                        <input type={"checkbox"} style={{position:"absolute",top:"320px",cursor:"pointer"}}/>
                        <div style={{position:"relative",top:"320px"}}>
                            <p style={{position:"relative",left:"30px",bottom:"10px",
                                color: "#3B82F6",
                                fontFamily: "sans-serif",
                                fontSize: "12px",
                                fontWeight: "bold",

                            }}>I agree to the Terms of Services and Privacy Policy</p>
                        </div>

                        <button className={"join-btn"} onClick={create}>joincareConnect</button>

                        <div className={"box25"}>
                            <p>ALREADY HAVE AN ACCOUNT</p>
                            <button className={"login-btn"}>Log in to your account</button>

                        </div>

                    </div>

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
export default PatientRegister;