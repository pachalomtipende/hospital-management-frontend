import Home from "./components/Home";
import PatientRegister from "./components/PatientRegister";
import {Routes,Route} from "react-router-dom";
import PatientLogin from "./components/PatientLogin";

function App(){
  return (
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
             <Route path="patientRegister" element={<PatientRegister/>} />
              <Route path= "/patientLogin" element={<PatientLogin/>} />
          </Routes>


      </div>
  )
}
export default App;
