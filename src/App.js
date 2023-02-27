import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import InstructorPanel from "./pages/InstructorPanel";
import ContextProvider from "./context/UserContext";
import AdminPanel from "./pages/AdminPanel";
import AddCourse from "./pages/AddCourse";
import CreateLecture from "./pages/CreateLecture";

function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/instructorPanel" element={<InstructorPanel />} />
            <Route path="/adminPanel" element={<AdminPanel />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/createLecture" element={<CreateLecture />} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
