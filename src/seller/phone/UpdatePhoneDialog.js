import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Input,
    Slide,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPhone, updatePhone } from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import {
    addPhoneReducer,
    fetchAddPhone,
    fetchUpdatePhone,
} from "../../redux/reducer/phoneSlice";

import SuccessAlert from "../../component/SuccessAlert";
import ErrorAlert from "../../component/ErrorAlert";
import Loading from "../../component/Loading";

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

export default function UpdatePhoneDialog(props) {
    const { open, setOpen, selectedPhone, action } = props;
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, getValues, reset } = useForm({
        defaultValues: {
            id: selectedPhone && action === "Update" ? selectedPhone.id : null,
            name:
                selectedPhone && action === "Update" ? selectedPhone.name : "",
            brand:
                selectedPhone && action === "Update" ? selectedPhone.brand : "",
            price:
                selectedPhone && action === "Update" ? selectedPhone.price : 0,
            description:
                selectedPhone && action === "Update"
                    ? selectedPhone.description
                    : "",
            url:
                selectedPhone && action === "Update" ? selectedPhone.url : null,
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) {
        if (e.target.files[0]) {
            setFile({
                url: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    useEffect(() => {
        reset({
            id: selectedPhone && action === "Update" ? selectedPhone.id : null,
            name:
                selectedPhone && action === "Update" ? selectedPhone.name : "",
            brand:
                selectedPhone && action === "Update" ? selectedPhone.brand : "",
            price:
                selectedPhone && action === "Update" ? selectedPhone.price : 0,
            description:
                selectedPhone && action === "Update"
                    ? selectedPhone.description
                    : "",
            url:
                selectedPhone && action === "Update" ? selectedPhone.url : null,
        });
        setFile(null);
    }, [open]);

    const handleSave = async () => {
        setIsLoading(true);
        const phone = getValues();
        const formData = new FormData();
        formData.append("name", phone.name);
        formData.append("brand", phone.brand);
        formData.append("price", phone.price);
        formData.append("description", phone.description);
        formData.append("file", file.raw);
        dispatch(fetchAddPhone(formData));
        handleOpenAlert();
    };

    const dispatch = useDispatch();
    const status = useSelector((state) => state.phone.status);

    useEffect(() => {
        if (status === "ERR_BAD_REQUEST") {
            setMessage("Don't save");
            setIsLoading(false);
        } else if (status === "success") {
            setMessage("Saved Successfully");
            setIsLoading(false);
        }
    }, [status]);

    const handleUpdate = async () => {
        const phone = getValues();
        console.log(phone);
        const formData = new FormData();
        if (file === null) {
            formData.append("id", phone.id);
            formData.append("name", phone.name);
            formData.append("brand", phone.brand);
            formData.append("price", phone.price);
            formData.append("description", phone.description);
            formData.append("url", phone.url);
            dispatch(fetchUpdatePhone(formData));
        } else {
            formData.append("id", phone.id);
            formData.append("name", phone.name);
            formData.append("brand", phone.brand);
            formData.append("price", phone.price);
            formData.append("description", phone.description);
            formData.append("file", file.raw);
            dispatch(fetchUpdatePhone(formData));
        }
    };

    return (
        <>
            <Loading {...{ isLoading }}></Loading>
            {status === "ERR_BAD_REQUEST" && openAlert ? (
                <ErrorAlert
                    open={openAlert}
                    handleClose={handleCloseAlert}
                    message={message}
                ></ErrorAlert>
            ) : null}
            {status === "success" && openAlert ? (
                <SuccessAlert
                    open={openAlert}
                    handleClose={handleCloseAlert}
                    message={message}
                ></SuccessAlert>
            ) : null}
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>{"Update Phone"}</DialogTitle>
                <DialogContent>
                    <Stack direction={"column"} spacing={2} mt={2}>
                        <input
                            type="file"
                            id="imgInput"
                            style={{ display: "none" }}
                            onChange={handleChange}
                        ></input>
                        Image
                        <label htmlFor="imgInput">
                            <div
                                style={{
                                    border: "2px dashed",
                                    borderColor: grey[300],
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    cursor: "pointer",
                                    height: "320px",
                                }}
                            >
                                {file ? (
                                    <img
                                        style={{
                                            objectFit: "cover",
                                            padding: 10,
                                            width: "90%",
                                            height: "300px",
                                            maxWidth: "250px",
                                        }}
                                        src={file.url}
                                    ></img>
                                ) : getValues("url") ? (
                                    <img
                                        style={{
                                            objectFit: "cover",
                                            padding: 10,
                                            width: "90%",
                                            height: "300px",
                                            maxWidth: "250px",
                                        }}
                                        src={getValues("url")}
                                    ></img>
                                ) : (
                                    "Choose image"
                                )}
                            </div>
                        </label>
                        <TextField
                            label="Name"
                            {...register("name")}
                        ></TextField>
                        <TextField
                            label="Brand"
                            {...register("brand")}
                        ></TextField>
                        <TextField
                            label="Price"
                            type="number"
                            {...register("price")}
                        ></TextField>
                        <TextField
                            label="Description"
                            {...register("description")}
                        ></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {action === "Add" ? (
                        <Button onClick={handleSave}>Save</Button>
                    ) : (
                        <Button onClick={handleUpdate}>Update</Button>
                    )}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
