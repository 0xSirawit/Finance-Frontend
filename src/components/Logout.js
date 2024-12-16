import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
    Cookies.remove("token");
    delete axios.defaults.headers.common["Authorization"];
    return <Navigate to="/login" />;
}
