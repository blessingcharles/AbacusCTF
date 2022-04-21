import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { toast } from "react-toastify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

toast.configure();

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="*" element={<Login />} />
            </Routes>
            {/* <Route path="/user/profile" element={}/> */}
        </Router>
    );
}

export default App;
