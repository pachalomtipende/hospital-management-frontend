import React, {useState} from 'react'
import {AlertCircle, CheckCircle, Clock, Heart, Shield} from "lucide-react";
import {Link} from "react-router-dom";
import { IdCard } from "lucide-react";
import { Upload } from "lucide-react";
import { HelpCircle } from "lucide-react";


function DoctorRegister() {


    const [navB  ,setNavB  ] = useState(true);
    const [selected, setSelected] = useState([]);
    const [fullName, setFullName] = useState("");
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [clinic, setClinic] = useState("");
    const [medicalLicenseNumber, setMedicalLicenseNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");




    const doctorRegister = async () => {
        const formData = new FormData();
        formData.append("doctor[full_name]", fullName);
        formData.append("doctor[professional_title]", professionalTitle);
        formData.append("doctor[clinic]", clinic);
        formData.append("doctor[medical_license_number]", medicalLicenseNumber);
        formData.append("doctor[email]", email);
        formData.append("doctor[phone_number]", phoneNumber);
        formData.append("doctor[password]", password);
        formData.append("doctor[password_confirmation]", passwordConfirmation);


        selected.forEach((item) => {
            formData.append("doctor[specialties][]", item);
        });


        if (file) {
            formData.append("doctor[document]", file);
        }

        try {
            const response = await fetch("http://localhost:3000/api/doctor", {
                method: "POST",
                body: formData,

            });

            const data = await response.json();
            if (response.ok) {
              alert(data.message);
            } else {
                alert(data.errors);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const specialtiesList = [
        "Cardiology",
        "Internal Medicine",
        "Pediatrics",
        "Neurology",
        "Oncology",
        "Dermatology",
        "Surgery",
    ];
    const handleAdd = (item) => {
        if (!selected.includes(item)) {
            setSelected([...selected, item]);
        }
    };

    const handleRemove = (item) => {
        setSelected(selected.filter((s) => s !== item));
    };
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
            <div className="box16" style={{
                background:"#F3F4F6",
                gap:"40px",
                height:"1500px"
            }}>
           <div className="dbox1" style={{
               bottom:"100px"

           }}>

               <IdCard size={22} color="#3b82f6" style={{
                   position: "relative",
                   top:"20px",
                   left:"30px",
               }} />
               <h5 style={{
                   position:"relative",
                   bottom:"23px",
                   left:"60px",
                   fontFamily:"sans-serif"

               }}> Professional Profile</h5>
               <p style={{
                   position:"relative",
                   bottom:"40px",
                   left:"30px",
                   fontFamily:"sans-serif",
                   fontSize:"12px",
                   color:"#6B7280"

               }}>Provide your credentials and professional background</p>
               <div style={{
                   position:"relative",
                   backgroundColor:"#E6F0FF",
                   height:"20px",
                   width:"20px",
                   borderRadius:"50%",
                   bottom:"30px",
                   left:"30px",
                   textAlign:"center"
               }}>
                   <h4>1</h4>

               </div>
               <h5 style={{
                   position:"relative",
                   bottom:"70px",
                   left:"60px",
                   fontFamily:"sans-serif",
                   color:"#1F2937"
               }}> Identity & Affiliation</h5>

               <div className={"dbox2"}>
                <div style={{
                    position:"absolute",

                    width:"400px",
                    height:"100px",
                    top:"10px",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:"60px",
                }}>

                    <div style={{
                        position:"relative",
                    }}>
                        <p style={{
                            position:"relative",
                            bottom:"10px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            fontWeight:"bold",
                            color:"#1F2937"
                        }}>Full Legal Name</p>
                       <input style={{
                        height:"30px",
                           position: "relative",
                           bottom:"10px",
                           borderRadius:"5px",
                           outline:"none",
                           border:"none",
                           boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                       }} value={fullName} onChange={(e)=>{
                           setFullName(e.target.value);
                       }}/>

                    </div>

                    <div style={{
                        position:"relative",
                    }}>
                        <p style={{
                            position:"relative",
                            bottom:"10px",
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            fontWeight:"bold",
                            color:"#1F2937"
                        }}>Professional Title</p>
                        <input style={{
                            height:"30px",
                            position: "relative",
                            bottom:"10px",
                            borderRadius:"5px",
                            outline:"none",
                            border:"none",
                            boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                        }} value={professionalTitle} onChange={(e)=>{
                            setProfessionalTitle(e.target.value);
                        }}/>

                    </div>

                </div>
                   <div style={{
                       position:"absolute",

                       width:"400px",
                       height:"100px",
                       top:"80px",
                       display:"flex",
                       justifyContent:"center",
                       alignItems:"center",
                       gap:"60px",
                   }}>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Clinic/ Hospital Affiliation</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} value={clinic} onChange={(e)=>{
                               setClinic(e.target.value);
                           }}/>

                       </div>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Medical Licence Number</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} value={medicalLicenseNumber} onChange={(e)=>{
                               setMedicalLicenseNumber(e.target.value);
                           }}/>

                       </div>



                   </div>
                   <p style={{
                       position:"relative",
                       top:"160px",
                       fontFamily:"sans-serif",
                       fontSize:"14px",
                       fontWeight:"bold",
                       color:"#1F2937"
                   }}>Specialties (select all that apply)</p>

                   <div style={{
                       position: "relative",
                       top: "170px",
                       width: "380px",
                       minHeight: "50px",
                      boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",
                       borderRadius: "8px",
                       padding: "10px",
                       display: "flex",
                       flexWrap: "wrap",
                       gap: "8px",

                   }}>
                       {selected.length === 0 && <span className="placeholder" style={{
                           fontFamily: "sans-serif",
                           color: "#1F2937",
                           fontSize:"14px",
                       }}>None selected</span>}

                       {selected.map((item) => (
                           <div key={item} style={{
                               background: "#e5e7eb",
                               padding: "5px 10px",
                               borderRadius: "6px",
                               display: "flex",
                               alignItems: "center",
                               gap: "6px",
                               fontFamily: "sans-serif",
                               color: "#1F2937",
                               fontSize:"14px",
                           }}>
                               {item}
                               <span
                                   onClick={() => handleRemove(item)}
                                   style={{ cursor: "pointer", fontWeight: "bold" }}
                               >
                ×
            </span>
                           </div>
                       ))}
                   </div>


                   <div style={{
                       position: "relative",
                       top: "190px",
                       width: "350px",
                       display: "flex",
                       flexWrap: "wrap",
                       gap: "10px"
                   }}>
                       {specialtiesList.map((item) => (
                           <button
                               key={item}
                               onClick={() => handleAdd(item)}
                               disabled={selected.includes(item)}
                               style={{
                                   padding: "6px 10px",
                                   borderRadius: "8px",
                                   border: "1px solid #ddd",
                                   background: "white",
                                   cursor: "pointer",
                                   fontSize: "12px",
                                   opacity: selected.includes(item) ? 0.4 : 1
                               }}
                           >
                               + {item}
                           </button>
                       ))}
                   </div>







               </div>
               <div style={{
                   position:"relative",
                   backgroundColor:"#E6F0FF",
                   height:"20px",
                   width:"20px",
                   borderRadius:"50%",
                   bottom:"120px",
                   left:"30px",
                   textAlign:"center"
               }}>
                   <h4>2</h4>

               </div>
               <h5 style={{
                   position:"relative",
                   bottom:"160px",
                   left:"60px",
                   fontFamily:"sans-serif",
                   color:"#1F2937"
               }}> Contact & security</h5>


               <div className={"dbox2"} style={{
                   bottom:"171px"
               }}>
                   <div style={{
                       position:"absolute",

                       width:"400px",
                       height:"100px",
                       top:"10px",
                       display:"flex",
                       justifyContent:"center",
                       alignItems:"center",
                       gap:"60px",
                   }}>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Email Address</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} value={email} onChange={(e)=>{
                               setEmail(e.target.value);
                           }}/>

                       </div>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Phone Number</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} value={phoneNumber} onChange={(e)=>{
                               setPhoneNumber(e.target.value);
                           }}/>

                       </div>

                   </div>
                   <div style={{
                       position:"absolute",

                       width:"400px",
                       height:"100px",
                       top:"80px",
                       display:"flex",
                       justifyContent:"center",
                       alignItems:"center",
                       gap:"60px",
                   }}>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Password</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} type={"password"} value={password} onChange={(e)=>{
                               setPassword(e.target.value);
                           }}/>

                       </div>

                       <div style={{
                           position:"relative",
                       }}>
                           <p style={{
                               position:"relative",
                               bottom:"10px",
                               fontFamily:"sans-serif",
                               fontSize:"12px",
                               fontWeight:"bold",
                               color:"#1F2937"
                           }}>Confim Password</p>
                           <input style={{
                               height:"30px",
                               position: "relative",
                               bottom:"10px",
                               borderRadius:"5px",
                               outline:"none",
                               border:"none",
                               boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",

                           }} type={"password"} value={passwordConfirmation} onChange={(e)=>{
                               setPasswordConfirmation(e.target.value);
                           }}/>

                       </div>



                   </div>


               </div>
               <div style={{
                   position:"relative",
                   backgroundColor:"#E6F0FF",
                   height:"20px",
                   width:"20px",
                   borderRadius:"50%",
                   bottom:"470px",
                   left:"30px",
                   textAlign:"center"
               }}>
                   <h4>3</h4>

               </div>
               <h5 style={{
                   position:"relative",
                   bottom:"510px",
                   left:"60px",
                   fontFamily:"sans-serif",
                   color:"#1F2937"
               }}> Credential Uploads</h5>
               <div style={{
                   position:"absolute",
                   height:"100px",
                   width:"400px",
                   left:"20px",
                   bottom:"120px",
                   borderTop:"#6B7280 1px solid",
                   borderBottom:"none",
                   borderLeft:"none",
                   borderRight:"none",
               }}>
                   <p style={{
                       fontFamily:"sans-serif",
                       color:"#1F2937",
                       fontSize:"12px",
                   }}>medical credentials(PDF,JPG,PNG)</p>
                   <div style={{ position: "relative",  }}>


                       <input
                           type="file"
                           id="fileUpload"
                           style={{ display: "none" }}
                           onChange={handleFileChange}
                       />


                       <label htmlFor="fileUpload">
                           <div
                               style={{
                                   width: "400px",
                                   height: "130px",
                                   cursor: "pointer",
                                   border: "2px dashed #d1d5db",
                                   borderRadius: "10px",
                                   background: "#f9fafb",
                                   display: "flex",
                                   flexDirection: "column",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   gap: "6px",
                               }}
                           >
                               <div style={{
                                   background: "#e5e7eb",
                                   borderRadius: "50%",
                                   position:"relative",
                                   top:"20px",
                                   width: "50px",
                                   height: "50px",
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   fontSize: "18px"
                               }}>
                                   <Upload size={22} color="#3b82f6" />
                               </div>

                               <p style={{ fontWeight: "bold", fontSize: "14px" ,fontFamily:"sans-serif"
                               , position: "relative",
                                   top:"20px"

                               }}>
                                   Click or drag to upload documentation
                               </p>

                               <p style={{ fontSize: "10px", color: "#6B7280" ,fontFamily:"sans-serif" ,textAlign:"center"  }}>
                                   Please provide a copy of your current medical license and board certifications.
                               </p>
                           </div>
                       </label>

                       {file && (
                           <div
                               style={{
                                   marginTop: "10px",
                                   width: "400px",
                                   padding: "10px",
                                   borderRadius: "8px",
                                   background: "#ecfdf5",
                                   display: "flex",
                                   justifyContent: "space-between",
                                   alignItems: "center",
                                   fontSize: "13px",
                                   height:"10px",
                               }}
                           >
                               <span>✅ {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)</span>

                               <span
                                   onClick={removeFile}
                                   style={{ cursor: "pointer", fontWeight: "bold" }}
                               >
        ×
      </span>
                           </div>
                       )}
                   </div>

               </div>
               <div style={{
                   position:"relative",
                   backgroundColor:"white",
                   height:"100px",
                   width:"450px",
                   bottom:"310px",
                   borderBottomRightRadius:"5px",
                   borderBottomLeftRadius:"5px",
               }}>
                   <button className={"doc-sub"} style={{
                       position:"relative",
                       backgroundColor:"#3B82F6",
                       width:"400px",
                       left:"20px",
                       border:"none",
                       borderRadius:"5px",
                       height:"40px",
                       color:"white",
                       fontFamily:"sans-serif",
                       fontWeight:"bold",
                       cursor:"pointer",

                   }} onClick={doctorRegister}>
                       Submit for verification



                   </button>
                   <p style={{
                       fontFamily:"sans-serif",
                       fontSize:"10px",
                       color:"#6B7280",
                       textAlign:"center",
                       position:"relative",
                       top:"20px",
                   }}>By submitting you agree to careConnect Professional terms and services and Data Handling Serivices</p>

               </div>


           </div>





                <div className="dbox1" style={{
                    background:"#E6F0FF",
                    height:"450px",
                    width:"250px",
                    bottom:"440px",

                }}>
                    <Shield size={20} color="#007BFF"  style={{
                        position:"relative",
                        left:"10px",
                        top:"10px",
                    }}/>
                    <h5 style={{
                        fontFamily:"sans-serif",
                        color:"#007BFF",
                        fontSize:"14px",
                        fontWeight:"bold",
                        position:"relative",
                        bottom:"34px",
                        left:"35px",
                    }}>Trust & Verification</h5>
                    <p style={
                        {
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            position:"relative",
                            bottom:"40px",
                            left:"10px",
                            color:"#1F2937",
                        }
                    }>To maintain the intergrity of our medical network all registrations undergo a rigorous secondary review </p>
                    <Clock size={22} color="#1F2937" style={{
                        position:"relative",
                        bottom:"30px",
                        left:"10px",
                    }} />
                    <h5 style={{
                        fontFamily:"sans-serif",
                        color:"#1F2937",
                        fontSize:"14px",
                        fontWeight:"bold",
                        position:"relative",
                        bottom:"77px",
                        left:"35px",
                    }}>Review Timeline</h5>
                    <p style={
                        {
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            position:"relative",
                            bottom:"85px",
                            left:"10px",
                            color:"#6B7280",
                        }
                    }>
                        Standard review takes 24-48 business <br/>hours.

                        You will receive an email once your <br/> credentials have been cross-referenced <br/>
                        with national boards
                    </p>
                    <div style={{
                        position:"relative",
                        height:"120px",
                        width:"220px",
                        left:"10px",
                        bottom:"70px",
                        borderTop:"1px solid #6B7280",
                        borderBottom:"1px solid #6B7280",

                    }}>
                    </div>
                    <CheckCircle size={22} color="#1F2937" style={{
                        position:"relative",
                        bottom:"180px",
                        left:"10px",
                    }} />
                    <h5 style={{
                        fontFamily:"sans-serif",
                        color:"#1F2937",
                        fontSize:"14px",
                        fontWeight:"bold",
                        position:"relative",
                        bottom:"227px",
                        left:"35px",
                    }}>Board Check</h5>
                    <p style={
                        {
                            fontFamily:"sans-serif",
                            fontSize:"12px",
                            position:"relative",
                            bottom:"230px",
                            left:"10px",
                            color:"#6B7280",
                        }
                    }>
                       We automatically verify NPI and state <br/>
                        license status through official regulatory database intergrations
                    </p>
                    <div style={{
                        position:"relative",
                        height:"80px",
                        width:"220px",
                        left:"10px",
                        backgroundColor:"#F3F4F6",
                        boxShadow:"0px 0px 3px rgba(0, 0, 0, 0.2)",
                        borderRadius:"5px",
                        bottom:"210px",
                    }}>
                        <AlertCircle size={15} color="#007BFF" style={{
                            position:"absolute",
                            left:"10px",
                            top:"10px",
                        }} />
                        <h6 style={
                            {
                                fontFamily:"sans-serif",
                                fontSize:"10px",
                                position:"relative",
                                left:"40px",
                                top:"10px",
                            }
                        }>HIPPA NOTICE</h6>
                        <p style={
                            {
                                fontFamily:"sans-serif",
                                fontSize:"10px",
                                position:"relative",
                                bottom:"10px",
                                left:"40px",
                                color:"#6B7280",
                            }
                        }>
                            We automatically verify NPI and state <br/>
                            license status through official regulatory <br/>
                            database intergrations
                        </p>


                    </div>



                </div>






                <div  className={"dbox-heading"} style={{

                    height:"100px",
                    width:"400px",
                    position:"absolute",
                    top:"50px",
                    right:"585px",
                    border:"none",

                }}>

                    <h1> Doctor Registration</h1>
                    <p> join our network of verified  medical professionals</p>
                </div>



            </div>
            <div style={{
                position:"relative",
                top:"650px",
                left:"750px",
                height:"100px",
                width:"250px",

            }}>
                <HelpCircle size={30} color="#6B7280" style={{
                    position:"relative",
                    left:"100px",
                }}  />
                <h5 style={{
                    fontFamily:"sans-serif",
                    fontSize:"12px",
                    position:"relative",
                    bottom:"20px",
                    textAlign:"center",
                    color:"#1F2937",
                }}>Need enrollment assistance?</h5>
                <p style={{
                    fontFamily:"sans-serif",
                    fontSize:"12px",
                    position:"relative",
                    bottom:"35px",
                    textAlign:"center",
                    color:"#6B7280",

                }}> Our specialist onboarding team is available 24/7 to help you complete your profile</p>

            </div>






            <div className={'box13'} style={{marginTop:"1300px"}}>
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
            <div className={'box15'} style={{top:"1685px",left:"10px"}}>
                <p>2026 @PMT.All rights reserved</p>

            </div>


        </div>
    )
}
export default DoctorRegister;