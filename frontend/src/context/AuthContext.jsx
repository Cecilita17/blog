import React, { useState, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    email: "",
    auth_token: null,
    refresh_token: null,
  });
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const isLoggedInLS = !!storedToken;
    setIsLoggedIn(isLoggedInLS);

    // Check if token is expired and remove if necessary
    if (isLoggedInLS) {
      const decodedToken = jwtDecode(storedToken);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = async ( navigate) => {
    const apiURL = "http://localhost:8000/auth/login/";
    const loginData = {
      email: email,
      password: password,
    };
    localStorage.setItem("email", email);

    try {
      const response = await axios.post(apiURL, loginData);
      console.log("data from API response: " + JSON.stringify(response.data));

      const token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      localStorage.setItem("authToken", token);
      const storedToken = localStorage.getItem("authToken");
      localStorage.setItem("refreshToken", refresh_token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      console.log("Login successful");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Unable to log in");
    }
  };

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(storedToken);
      localStorage.setItem("userId", decodedToken.user_id);

      const userInfo = {
        id: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
        access_token: storedToken,
        refresh_token: localStorage.getItem("refreshToken"),
      };
      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      setCurrentUser(localStorage.getItem("currentUser", userInfo));
    } catch (error) {}
  }, [storedToken, currentUser]);

  useEffect(() => {
    const apiURL = "http://localhost:8000/api/token/refresh/";
    const refresh_token = localStorage.getItem("refreshToken");
    const refreshData = {
      refresh: refresh_token,
    };
    const getNewUserToken = async () => {
      try {
        const response = await axios.post(apiURL, refreshData);
        const token = response.data.access;
        localStorage.setItem("authToken", token);
        const storedToken = localStorage.getItem("authToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(getNewUserToken, 1000 * 60 *4);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
