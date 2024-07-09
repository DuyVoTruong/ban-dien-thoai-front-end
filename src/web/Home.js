import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPhone } from "../redux/reducer/phoneSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "../css/Home.css";
import { green, red } from "@mui/material/colors";
import LazyLoad from "react-lazyload";
import ChatRoom from "../component/ChatRoom";
import TestWebSocket from "../component/TestWebSocket";

export default function WebHome() {
    const phone = useSelector((state) => state.phone.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPhone());
    }, []);

    //Chuyen doi don vi tien te 1000 thanh 1.000
    let formatting_options = {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    };

    function LazyloadImg({ url }) {
        return (
            <LazyLoad throttle={1000} height={140}>
                <img
                    src={url}
                    style={{ height: 140, width: "100%", objectFit: "cover" }}
                />
            </LazyLoad>
        );
    }

    const chipStyle = {
        height: "35px",
        minWidth: "115px",
        width: "100%",
        backgroundColor: "white",
        border: "grey 2px solid",
        "& .MuiChip-label": {
            padding: "0px",
            height: "25px",
        },
    };

    const labelChipStyle = {
        height: "25px",
        padding: "0px",
        width: "100px",
        objectFit: "fill",
    };

    const FilterComponent = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/Realme42-b_37.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/logo-honor-220x48-2.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/tcl-logo-lon-220x48.jpg"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/logo-tecno-big-220x48.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Chip
                            sx={chipStyle}
                            label={
                                <img
                                    style={labelChipStyle}
                                    src="//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg"
                                ></img>
                            }
                        ></Chip>
                    </Grid>
                </Grid>
            </>
        );
    };

    return (
        <>
            <Container>
                <FilterComponent />
                <TestWebSocket></TestWebSocket>
                <Grid style={{ marginTop: 50 }} container spacing={2}>
                    {phone.map((item, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                md={3}
                                display={"flex"}
                                justifyContent={"center"}
                            >
                                <Card
                                    className="card"
                                    sx={{ width: 250, mt: 2, mb: 2 }}
                                >
                                    {/* <CardMedia
                                        sx={{ height: 140 }}
                                        image={item.url}
                                        title="phone image"
                                    /> */}
                                    <LazyloadImg url={item.url} />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography color="red" fontSize={20}>
                                            {(() => {
                                                let vndString =
                                                    new Intl.NumberFormat(
                                                        "vi",
                                                        formatting_options
                                                    );
                                                return vndString.format(
                                                    item.price
                                                );
                                            })()}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{ backgroundColor: red[300] }}
                                        >
                                            <AddShoppingCartIcon></AddShoppingCartIcon>
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{ backgroundColor: green[500] }}
                                        >
                                            <RateReviewIcon></RateReviewIcon>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
}
