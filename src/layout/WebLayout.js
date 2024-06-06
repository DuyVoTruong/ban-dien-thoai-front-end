import { Outlet } from "react-router-dom";
import WebHeader from "./WebHeader";
import WebFooter from "./WebFooter";
import { Toolbar } from "@mui/material";

export default function WebLayout() {
    return (
        <>
            <WebHeader />
            <Toolbar variant="dense" />
            <Outlet />
            <WebFooter />
        </>
    );
}
