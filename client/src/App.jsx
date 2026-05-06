import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import Home from "./pages/Home";
import Generate from "./pages/Generate";

export const serverUrl = "http://localhost:8000";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          serverUrl + "/api/user/currentUser",
          { withCredentials: true },
        );
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  },[dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </>
  );
}

export default App;
