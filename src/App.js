import Home from "./components/Home";
import PatientRegister from "./components/PatientRegister";
import {Routes,Route} from "react-router-dom";

function App(){
  return (
      <div>
          <Routes>
              <Route path="/" element={<Home/>} />
             <Route path="patientRegister" element={<PatientRegister/>} />
          </Routes>


      </div>
  )
}
export default App;
