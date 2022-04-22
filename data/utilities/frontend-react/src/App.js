import "./App.css";
import { toast } from "react-toastify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Route path="/user/profile" element={}/> */}
      </Router>
    </>
  );
}

export default App;
