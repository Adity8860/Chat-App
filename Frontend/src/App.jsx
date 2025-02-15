import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage";
import SettingPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, authUser, isCheckingAuth,onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({onlineUsers})
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          {/* <Route
            path="/"
            element={ <HomePage /> }
          /> */}
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/settings"
            element={authUser ? <SettingPage /> : <Navigate to="/login" />}
          />
           <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
