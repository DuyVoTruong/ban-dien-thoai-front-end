import { Label } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/reducer/accountSlice";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default function Login() {
    const { register, getValues } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.value);
    const status = useSelector((state) => state.account.status);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleLogin = () => {
        setOpen(true);
        const data = getValues();
        dispatch(fetchLogin(data));
    };

    const nav = useNavigate();

    const navigatePage = () => {
        if (account.role === "USER") {
            nav("/", { replace: true });
        } else if (account.role === "SELLER") {
            nav("/seller", { replace: true });
        } else if (account.role === "ADMIN") {
            nav("/admin", { replace: true });
        }
    };

    useEffect(() => {
        if (status === "ERR_BAD_REQUEST") {
            setOpen(true);
            setMessage("Username or password is incorrect");
        } else if (status === "success") {
            setOpen(true);
            setMessage("Login is successful");
            setIsloading(true);
            setTimeout(() => {
                setIsloading(false);
                navigatePage();
            }, 1000);
        } else if (status == "ERR_NETWORK") {
            setOpen(true);
            setMessage("Can't connect to network");
        }
    }, [status]);

    return (
        <>
            <Loading isLoading={isLoading}></Loading>
            {status === "ERR_BAD_REQUEST" && open ? (
                <ErrorAlert {...{ open, handleClose, message }}></ErrorAlert>
            ) : null}
            {status === "success" && open ? (
                <SuccessAlert
                    {...{ open, handleClose, message }}
                ></SuccessAlert>
            ) : null}
            {status == "ERR_NETWORK" && open ? (
                <ErrorAlert {...{ open, handleClose, message }}></ErrorAlert>
            ) : null}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: grey[300],
                }}
            >
                <Card
                    sx={{
                        width: "80%",
                        maxWidth: "450px",
                    }}
                >
                    <CardHeader
                        title="Login"
                        style={{ textAlign: "center" }}
                    ></CardHeader>
                    <CardContent>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item sm={12}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    size="small"
                                    placeholder="Username"
                                    {...register("username", {
                                        required: true,
                                    })}
                                    autoFocus
                                ></TextField>
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    size="small"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                ></TextField>
                            </Grid>
                            <Grid item sm={12}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Remeber me"
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button
                                    sx={{ width: "100%" }}
                                    variant="contained"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction={"row"}
                            sx={{ display: "flex", mt: 2 }}
                        >
                            <Grid
                                item
                                sm={5}
                                xs={12}
                                sx={{
                                    textAlign: { xs: "center", sm: "start" },
                                }}
                            >
                                <Typography>
                                    <Link to={"/"}>Forgot password?</Link>
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: { xs: "inherit", sm: "none" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                xs={12}
                            >
                                <Typography>Or</Typography>
                            </Grid>
                            <Grid
                                item
                                sm={7}
                                xs={12}
                                sx={{ textAlign: { sm: "end", xs: "center" } }}
                            >
                                <Typography>
                                    Don't have an account?{" "}
                                    <Link to={"/"} replace>
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid
                                md={12}
                                xs={12}
                                display="flex"
                                justifyContent="center"
                            >
                                <Typography sx={{ pt: 2 }}>
                                    <Link to={"/"} replace>
                                        Go to home page
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
