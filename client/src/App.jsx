import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setUserData, setAllComponents } from "./redux/userSlice";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import AdminDashboard from "./pages/AdminDashboard";

export const serverUrl = "http://localhost:8000";



function App() {
  const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);


      const [authChecked, setAuthChecked] = useState(false);

      // Auth check (NON-BLOCKING)
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
      } finally{
        setAuthChecked(true)
      }
    };

    fetchUser();
  },[dispatch]);

  // Fetch extra data ONLY if admin/user exists
    useEffect(() => {
      if (!userData) return;

      const fetchExtraData = async () => {
        try {
          const [usersRes, componentsRes] = await Promise.all([
            axios.get(`${serverUrl}/api/user/all-users`, {
              withCredentials: true,
            }),
            axios.get(`${serverUrl}/api/component/all-components`, {
              withCredentials: true,
            }),
          ]);

          dispatch(setAllUsers(usersRes.data));
          dispatch(setAllComponents(componentsRes.data));

        } catch (error) {
          console.error("Extra API Error:", error);
        }
      };

      fetchExtraData();
    }, [userData, dispatch]);

  return (
    <>
      {!authChecked && (
        <div className="fixed top-0 left-0 w-full h-1 bg-purple-500 animate-pulse z-50" />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </>
  );
}

export default App;
