import { useContext, useEffect, useState } from "react";
import SignLog from "./components/authentication/SignLog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import axiosInstance from "./utilities/AxiosInstance";
import { context } from "./context/UserContext";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import NavBar from "./components/Layout/NavBar";
export default function App() {
  const { user, setUser, token } = useContext(context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(token);

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("User data:", response.data);
          setUser(response.data.user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-row gap-2 justify-center items-center bg-gray-100 rounded-lg py-4">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      {!token ? (
        <Routes>
          <Route path={"/"} element={<SignLog />} />
        </Routes>
      ) : (
        <>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Homepage user={user} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messenger />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
