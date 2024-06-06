import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
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

export default function WebHome() {
    const phone = useSelector((state) => state.phone.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPhone());
    }, []);

    let formatting_options = {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    };

    return (
        <>
            <Container>
                <Grid container spacing={2}>
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
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={item.url}
                                        title="phone image"
                                    />
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
