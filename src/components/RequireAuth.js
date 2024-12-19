import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const URL_CHECKAUTH = "/api/users/me";

export default function RequiredAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            const token = Cookies.get("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                axios.defaults.headers.common = {
                    Authorization: `bearer ${token}`,
                };
                const response = await axios.get(URL_CHECKAUTH);
                setIsAuthenticated(!!response.data?.username);
                setUserInfo(response.data);
            } catch (err) {
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return;
    }

    return isAuthenticated ? <Outlet context={{ userInfo, setUserInfo }} /> : <Navigate to="/login" />;
}
