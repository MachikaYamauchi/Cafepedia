import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditCafe from "./pages/AddEditCafe";
import SingleCafe from "./pages/SingleCafe";

const clientId =
  "435928807684-f4auu37jmh4mq62rt71fuhdfhnk53gsb.apps.googleusercontent.com";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    gapi.load("client:auth2", start);
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addCafe" element={<AddEditCafe />} />
          <Route path="/editCafe/:id" element={<AddEditCafe />} />
          <Route path="/cafe/:id" element={<SingleCafe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
