import Home from "./components/Home";
import PatientRegister from "./components/PatientRegister";
import {Routes,Route} from "react-router-dom";
import PatientLogin from "./components/PatientLogin";
import CreatePortal from "./components/CreatePortal";
import StaffPortal from "./components/StaffPortal";
import DoctorRegister from "./components/DoctorRegister";

function App(){
  return (
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
             <Route path="patientRegister" element={<PatientRegister/>} />
              <Route path= "/patientLogin" element={<PatientLogin/>} />
              <Route path="/createPortal" element={<CreatePortal/>} />
              <Route path="/staffPortal" element={<StaffPortal/>} />
              <Route path="/doctorRegister" element={<DoctorRegister/>} />
          </Routes>


      </div>
  )
}
export default App;
