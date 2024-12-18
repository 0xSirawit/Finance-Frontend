import axios from "axios";
import LoginScreen from "./pages/LoginScreen";
import RequiredAuth from "./components/RequireAuth";
import HomeScreen from "./pages/HomeScreen";
import { Routes, BrowserRouter, Route } from "react-router-dom";
axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route element={<RequiredAuth />}>
                    <Route path="/" element={<HomeScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
