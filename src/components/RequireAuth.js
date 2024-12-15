import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_CHECKAUTH = "/api/users/me";

export default function RequiredAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  useEffect(() => {
    async function checkAuth() {
      const token = getCookie("token");
      try {
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
        const response = await axios.get(URL_CHECKAUTH);
        if (response.data.username) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
