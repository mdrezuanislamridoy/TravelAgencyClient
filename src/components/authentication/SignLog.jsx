import { useState } from "react";
import axiosInstance from "../../utilities/AxiosInstance";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserTie,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function SignLog() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle the email verification process
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    if (!email || !validateEmail(email)) {
      setMessage("Please enter a valid email.");
      setLoadingVerify(false);
      return;
    }
    try {
      const response = await axiosInstance.post("/api/auth/verifyCode", {
        email,
      });
      setToken(response.data.token);
      setIsVerifying(true);
      setLoadingVerify(false);
      setMessage("Verification email sent. Please check your inbox.");
      setSentMail(true);
      startTimer(); // Start the 30-second countdown after sending email
    } catch (error) {
      setMessage("Failed to send verification email.");
      setLoadingVerify(false);
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
    let timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          setRemainingTime(30);
          setSentMail(false);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("No verification token found.");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        name,
        email,
        password: pass,
        enteredCode: verificationCode,
        token,
        role,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed.");
    }
    setName("");
    setEmail("");
    setPass("");
    setVerificationCode("");
    setIsVerifying(false);
    setIsSignUp(false);
  };

  const handleLoggedIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password: pass,
      });
      if (response.data.token) {
        setMessage(response.data.message);
        setEmail("");
        setPass("");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        window.location.href = "/";
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-color">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <p className="text-center extra-color">
          {message &&
            (typeof message === "object" ? JSON.stringify(message) : message)}
        </p>

        <form onSubmit={isSignUp ? handleSignUp : handleLoggedIn}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-color">Name</label>
              <div className="flex items-center border p-2 rounded-md">
                <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-color">Email</label>
            <div className="flex items-center border p-2 rounded-md">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 mr-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          {isSignUp && (
            <button
              onClick={handleVerify}
              className="secondary-bg-color text-white p-2 rounded-md w-full"
              disabled={isTimerActive}
            >
              {loadingVerify ? (
                <div className="flex flex-row gap-2 justify-center items-center py-1">
                  <div className="w-4 h-4 rounded-full  bg-white animate-bounce"></div>
                  <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-4 h-4 rounded-full  bg-white animate-bounce [animation-delay:-.5s]"></div>
                </div>
              ) : (
                <>{sentMail ? `${remainingTime}s` : "Verify Email"}</>
              )}
            </button>
          )}
          {isVerifying && (
            <div className="mb-4">
              <label className="block text-color">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-color">Password</label>
            <div className="flex items-center border p-2 rounded-md">
              <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-color">Role</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="traveler"
                    checked={role === "traveler"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faUserTie} className="ml-2" /> Traveler
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="agency"
                    checked={role === "agency"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faPeopleGroup} className="ml-2" />{" "}
                  Agency
                </label>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="secondary-bg-color text-white p-2 rounded-md w-full"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          <Link onClick={() => setIsSignUp(!isSignUp)} className="extra-color">
            {isSignUp ? "Login Instead" : "Create an Account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
