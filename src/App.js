import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WebLayout from "./layout/WebLayout";
import WebHome from "./web/Home";
import DashBoardLayout from "./layout/DashboardLayout";
import SellerHome from "./seller/Home";
import ErrorPage from "./component/ErrorPage";
import Login from "./component/Login";
import { useEffect } from "react";
import { fetchInforToJwt } from "./redux/reducer/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminHome from "./admin/Home";

function App() {
    const account = useSelector((state) => state.account.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt !== null) {
            dispatch(fetchInforToJwt(jwt));
        }
    }, []);

    if (account.role === null) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WebLayout />}>
                        <Route index element={<WebHome />}></Route>
                    </Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else if (account.role === "USER") {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WebLayout />}>
                        <Route index element={<WebHome />}></Route>
                    </Route>
                    <Route
                        path="/login"
                        //element={<Navigate to="/" replace />}
                        element={<Login></Login>}
                    ></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else if (account.role === "SELLER") {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/seller" element={<DashBoardLayout />}>
                        <Route index element={<SellerHome />}></Route>
                    </Route>
                    <Route
                        path="/login"
                        //element={<Navigate to="/seller" replace />}
                        element={<Login></Login>}
                    ></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else if (account.role === "ADMIN") {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<DashBoardLayout />}>
                        <Route index element={<AdminHome />}></Route>
                    </Route>
                    <Route
                        path="/login"
                        //element={<Navigate to="/admin" replace />}
                        element={<Login></Login>}
                    ></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
