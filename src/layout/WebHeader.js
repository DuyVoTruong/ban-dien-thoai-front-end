import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { grey, yellow } from "@mui/material/colors";
import { resetAccount } from "../redux/reducer/accountSlice";
import AccountMenu from "./AccountMenu";

function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function WebHeader(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const nav = useNavigate();
    const account = useSelector((state) => state.account.value);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        dispatch(resetAccount());
        nav("/login", { replace: true });
    };

    const onClickLoginNav = () => {
        nav("/login", { replace: true });
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <ElevationScroll {...props}>
                <AppBar
                    component={"nav"}
                    style={{ backgroundColor: yellow[700] }}
                >
                    <Container style={{ color: grey[800] }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                MUI
                            </Typography>
                            <Typography
                                component="div"
                                sx={{
                                    flexGrow: 5,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                    }}
                                >
                                    {navItems.map((item) => (
                                        <Button
                                            key={item}
                                            sx={{ color: grey[800] }}
                                        >
                                            {item}
                                        </Button>
                                    ))}
                                </Box>
                            </Typography>
                            <Typography
                                component="div"
                                sx={{
                                    flexGrow: 2,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                <FormControl>
                                    <OutlinedInput
                                        sx={{ backgroundColor: "white" }}
                                        size="small"
                                        placeholder="Search"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    ></OutlinedInput>
                                </FormControl>
                            </Typography>
                            {account?.role != null ? (
                                <AccountMenu
                                    colorStyle={{ color: "black" }}
                                ></AccountMenu>
                            ) : (
                                <Box
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                    }}
                                >
                                    <Button
                                        sx={{ color: grey[800] }}
                                        onClick={onClickLoginNav}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar />
        </>
    );
}
