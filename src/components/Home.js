import './user.css';
import React from 'react';
import { Heart } from "lucide-react";
import {useState} from "react";
import { Activity } from "lucide-react";
import { Stethoscope} from "lucide-react";
import { Users, ShieldCheck, CalendarCheck, Clock,Bell } from "lucide-react";
import { Shield, Plus } from "lucide-react";




function Home() {
    const [navB  ,setNavB  ] = useState(true);
    return (
        <div>
            <div className="box1">
                <div className="logo">
                    <div className="icon">
                        <Heart color="white" size={18} />
                    </div>
                    <h1>CareConnect</h1>
                </div>
                <button className={"home-button"}>Home</button>
                <button className={"nav-button"} onClick={()=>{
                    setNavB(false);
                }}>Log in</button>
                <button className={"nav-button"} style={{left:'1000px'}} onClick={()=>{
                    setNavB(true);
                }}>Get Started</button>

                {navB ? (
                    <button className={"nav-button"} style={{left:'1000px',backgroundColor:'#3B82F6',color:'white'}}>Get Started</button>

                ):(
                    <button className={"nav-button"} style={{ backgroundColor:'#3B82F6',color:'white'}}>Log in</button>
                )}

            </div>
            <div className="box2">
                <div className={'box3'}>

                    <div className="badge">
                        <Activity size={16} className="badge-icon" />
                        Trusted by over 5+ patients
                    </div>

                    <h1>
                        Healthcare at your <br />
                        <span className="highlight">fingertips</span>
                    </h1>

                    <p>
                        Experience the future of medical care. Connect with top doctors,
                        manage your health records, and book appointments instantly from
                        any device.
                    </p>
                    <button className={"box-button"} onClick={()=>{ setNavB(true)}}>Get Started</button>
                    <button className={"box-button"} style={{marginLeft:'200px'}} onClick={()=>{setNavB(false)}}>Existing Patient Login</button>

                    {navB ? (
                        <button className={"box-button"} style={{backgroundColor:'#3B82F6',color:'white'}}>Get Started</button>

                    ):(
                        <button className={"box-button"} style={{marginLeft:'200px',backgroundColor:'#3B82F6',color:'white'}}>Existing Patient Login</button>

                    )}

                </div>
                <div className={'box4'}>
                    <img src="/images/Doctor.jpg" alt="doctor"
                         style={{height: '350px', borderRadius: '10px', boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.3)",width:'500px'}} />
                </div>

            </div>
            <div className={"box5"}>
                <div className={'box6'}>
                    <h1>Everything you need for better health</h1>
                    <p>
                        We've built a comprehensive ecosystem to simplify your healthcare
                        journey,
                    </p>
                    <p>
                        from first symptom to final recovery.
                    </p>


                </div>
                <div className={'box7'}>
                    <div className={'box8'}>
                        <div className="icon-box">
                            <Stethoscope size={20} color="#2563EB" />
                        </div>
                        <h3>Symptom Checker</h3>
                        <p>
                            Easily record and monitor your symptoms.<br/>
                            Our AI-assisted tool helps you
                            prepare for your consultation with accurate data.
                        </p>
                    </div>
                    <div className={'box8'}>
                        <div className="icon-box">
                            <CalendarCheck size={20} color="#2563EB" />
                        </div>
                        <h3>Smart Booking</h3>
                        <p>
                            Browse doctor availability in real-time.<br/>
                            Book, reschedule, or cancel
                            appointments with just a few clicks.
                        </p>

                    </div>
                    <div className={'box8'}>
                        <div className="icon-box">
                            <Bell size={20} color="#2563EB" />
                        </div>
                        <h3>Instant Alerts</h3>
                        <p>
                            Never miss a dosage or a check-up. <br/>Get push notifications and reminders<br/>
                            directly to your smartphone or email.
                        </p>
                    </div>


                </div>

            </div>
            <div className={'box9'}>
                <div className={'box10'}>

                    <div className={'box11'}>
                        <Users size={22} color="#60A5FA" />
                        <h2>5+</h2>
                        <p>ACTIVE PATIENTS</p>

                    </div>
                    <div className={'box11'}>
                        <ShieldCheck size={22} color="#60A5FA" />
                        <h2>2</h2>
                            <p>QUALIFIED DOCTORS</p>

                    </div>
                    <div className={'box11'}>
                        <CalendarCheck size={22} color="#60A5FA" />
                        <h2>10</h2>
                        <p>BOOKINGS DAILY</p>
                    </div>
                    <div className={'box11'}>
                        <Clock size={22} color="#60A5FA" />
                        <h2>&lt;15min</h2>
                        <p>AVERAGE BOOKING</p>
                    </div>



                </div>

            </div>
            <div className={"box12"}>
                <div style={{ position: "relative", display: "inline-block" , marginLeft:'300px' }}>
                    <Shield size={60} color="#007BFF" />
                    <Plus
                        size={20}
                        color="#007BFF"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    />
                </div>
                <h2> Ready to take control of your healthy</h2>
                <p>Be one of patients who trust careConnect for their medical needs.
                    <br/>Registration is free and takes less than 2 minutes.</p>
                <button className={"last-btn"}  onClick={()=>{
                    setNavB(true)
                }}>Create Account</button>
                <button className={"last-btn"} style={{left:"350px",backgroundColor:""}} onClick={()=>{
                    setNavB(false)
                }}>Staff Portal</button>

                {navB?(
                    <button className={"last-btn"} style={{backgroundColor:"#3B82F6",color:"white"}}>Create Account</button>

                ):(
                    <button className={"last-btn"} style={{left:"350px",backgroundColor:"#3B82F6",color:"white"}}>Staff Portal</button>

                )}


            </div>

            <div className={'box13'}>
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
            <div className={'box15'}>
                <p>2026 @PMT.All rights reserved</p>

            </div>




        </div>
    )
}
export default Home;