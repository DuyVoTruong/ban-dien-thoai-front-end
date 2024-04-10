import { Outlet } from "react-router-dom";
import WebHeader from "./WebHeader";
import WebFooter from "./WebFooter";

export default function WebLayout() {
    return (
        <>
            <WebHeader />
            <Outlet />
            <WebFooter />
        </>
    );
}
