import {
    AppBar,
    Box,
    Collapse,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { blue, blueGrey, grey, teal } from "@mui/material/colors";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
    const { window, children, listItemDrawer } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [selectedItemDrawer, setSelectedItemDrawer] = useState(null);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleClickListOpen = (index, title) => {
        if (selectedItemDrawer?.index === index) {
            setListOpen(!listOpen);
        } else {
            setListOpen(true);
        }
        handleClickItemDrawer(index, title);
    };

    const handleClickItemDrawer = (index, title) => {
        setSelectedItemDrawer({
            index,
            title,
        });
    };

    const drawer = (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            <List>
                {listItemDrawer.map((item, index) =>
                    item?.list ? (
                        <div key={index}>
                            <ListItem
                                disablePadding
                                onClick={() => handleClickListOpen(index, null)}
                                selected={
                                    listOpen &&
                                    selectedItemDrawer?.index === index
                                }
                            >
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                    {listOpen &&
                                    selectedItemDrawer?.index === index ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                            </ListItem>
                            <Collapse
                                in={
                                    listOpen &&
                                    selectedItemDrawer?.index === index
                                }
                                timeout="auto"
                                unmountOnExit
                                style={{ backgroundColor: blueGrey[800] }}
                            >
                                <List component="div" disablePadding>
                                    {item.list.map(
                                        (listItem, indexListItem) => {
                                            return (
                                                <ListItem
                                                    disablePadding
                                                    key={`listItem${listItem.title}`}
                                                    onClick={() =>
                                                        handleClickItemDrawer(
                                                            index,
                                                            listItem.title
                                                        )
                                                    }
                                                    selected={
                                                        listOpen &&
                                                        selectedItemDrawer?.title ===
                                                            listItem.title
                                                    }
                                                >
                                                    <ListItemButton
                                                        sx={{ pl: 4 }}
                                                    >
                                                        <ListItemIcon>
                                                            {listItem.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                listItem.title
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        }
                                    )}
                                </List>
                            </Collapse>
                        </div>
                    ) : (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => handleClickItemDrawer(index, null)}
                            selected={selectedItemDrawer?.index === index}
                        >
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    // const container =
    //     window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                    <Typography
                        sx={{
                            flexGrow: 1,
                        }}
                    ></Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    //container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: blueGrey[900],
                            color: grey[300],
                        },
                        "& .MuiListItem-root:hover": {
                            backgroundColor: blueGrey["A700"],
                        },
                        "& .MuiListItemIcon-root": {
                            color: grey[300],
                            minWidth: "40px",
                        },
                        "&& .Mui-selected": {
                            backgroundColor: blueGrey["A700"],
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: blueGrey[900],
                            color: grey[300],
                        },
                        "& .MuiListItem-root:hover": {
                            backgroundColor: blueGrey["A700"],
                        },
                        "& .MuiListItemIcon-root": {
                            color: grey[300],
                            minWidth: "40px",
                        },
                        "&& .Mui-selected": {
                            backgroundColor: blueGrey["A700"],
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar variant="dense" />
                <Typography paragraph>{children}</Typography>
            </Box>
        </Box>
    );
}
