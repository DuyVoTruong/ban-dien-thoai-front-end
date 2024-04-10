import { Box, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const account = useSelector((state) => state.account.value);
    const nav = useNavigate();

    const backHome = () => {
        if (account.role === "USER") {
            nav("/", { replace: true });
        } else if (account.role === "SELLER") {
            nav("/seller", { replace: true });
        } else if (account.role === "ADMIN") {
            nav("/admin", { replace: true });
        } else {
            nav("/", { replace: true });
        }
    };
    return (
        <Stack
            direction={"column"}
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <h3>404 NOT FOUND !!!</h3>
            </div>
            <div>
                <Button onClick={backHome}>Back Home</Button>
            </div>
        </Stack>
    );
}
