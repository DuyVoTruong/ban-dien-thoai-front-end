import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Table,
    TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { blue, grey } from "@mui/material/colors";

const centerStyle = {
    display: "flex",
    alignItems: "center",
};

const h1Style = {
    color: "white",
};

const spanStyle = {
    whiteSpace: "nowrap",
    marginLeft: "10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

export default function WebFooter() {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: grey[900],
                    color: grey[300],
                    width: "100%",
                    display: "inline-block",
                }}
            >
                <Container>
                    <Grid container spacing={{ sm: 4, xs: 2 }}>
                        <Grid item sm={1} xs={0}></Grid>
                        <Grid item sm={4} xs={12}>
                            <h1 style={h1Style}>About us</h1>
                            <p style={{ textAlign: "justify" }}>
                                Chúng tôi cung cấp một dịch vụ mua sắm trực
                                tuyến nhanh chóng tiện lợi dành cho khách hàng.
                                {"\n"} Quý khách có thể mua ở bất cứ đâu và được
                                giao hàng tận nơi miễn phí trong bán kính 10km
                            </p>
                            <p style={centerStyle}>
                                <LocalPhoneIcon />
                                <span style={spanStyle}>0366441943</span>
                            </p>
                            <p style={centerStyle}>
                                <EmailIcon />
                                <span style={spanStyle}>
                                    votruongduy1943@gmail.com
                                </span>
                            </p>
                            <p style={centerStyle}>
                                <LocationOnIcon />
                                <span style={spanStyle}>
                                    Thu Duc City, Ho Chi Minh City
                                </span>
                            </p>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <h1 style={h1Style}>Services</h1>
                            <p>Delivery</p>
                            <p>Shopping</p>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <h1 style={h1Style}>Help</h1>
                            <p>Privacy policy</p>
                            <p>FAQ</p>
                            <p>Support</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={{ sm: 4, xs: 2 }}>
                        <Grid item sm={1} xs={0}></Grid>
                        <Grid item sm={4} xs={12}>
                            <h1 style={h1Style}>Contact us</h1>
                            <Paper component={"form"} sx={{ display: "flex" }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 2 }}
                                    placeholder="Enter your questions..."
                                    inputProps={{
                                        "aria-label": "search google maps",
                                    }}
                                ></InputBase>
                                <Box sx={{ backgroundColor: blue[500] }}>
                                    <IconButton sx={{ color: grey[50] }}>
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item sm={3} xs={0}></Grid>
                        <Grid item sm={4} xs={12}>
                            <h1 style={h1Style}>Follow us</h1>
                            <Box>
                                <InstagramIcon sx={{ margin: "10px" }} />
                                <a
                                    style={{ color: grey[300] }}
                                    href="https://web.facebook.com/truongduy.vo.5011"
                                >
                                    <FacebookIcon sx={{ margin: "10px" }} />
                                </a>
                                <YouTubeIcon sx={{ margin: "10px" }} />
                                <XIcon sx={{ margin: "10px" }} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: 5, backgroundColor: "white" }} />
                    <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Grid item sm={12} xs={12}>
                            <p>copyright © 2024 all rights reserved</p>
                        </Grid>
                        {/* <Grid
                        item
                        sm={6}
                        xs={12}
                        textAlign={{ sm: "end", xs: "start" }}
                    >
                        <Box>
                            <InstagramIcon />
                            <FacebookIcon />
                            <YouTubeIcon />
                            <XIcon />
                        </Box>
                    </Grid> */}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
