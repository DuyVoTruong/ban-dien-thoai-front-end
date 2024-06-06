import DataTable from "../../component/DataTable";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import UpdatePhoneDialog from "./UpdatePhoneDialog";
import { getAllPhone } from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllPhone,
    fetchDeletePhone,
} from "../../redux/reducer/phoneSlice";

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "brand",
        numeric: false,
        disablePadding: false,
        label: "Brand",
    },
    {
        id: "price",
        numeric: false,
        disablePadding: false,
        label: "Price",
    },
    {
        id: "image",
        numeric: false,
        disablePadding: false,
        label: "Image",
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        label: "Description",
    },
];

export default function Phone() {
    const phone = useSelector((state) => state.phone.value);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        dispatch(fetchAllPhone());
    }, []);

    const tableBody = (item, index) => {
        return (
            <>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                    <img
                        style={{ height: 100, width: 120 }}
                        src={`${item.url}`}
                    ></img>
                </TableCell>
                <TableCell>{item.description}</TableCell>
            </>
        );
    };

    const getSelectedPhone = () => {
        if (selected.length > 0) {
            setSelectedPhone(phone.filter((item) => item.id == selected[0])[0]);
        } else {
            setSelectedPhone(null);
        }
    };

    useEffect(() => {
        getSelectedPhone();
    }, [selected]);

    const handleDelete = () => {
        selected.forEach((item, index) => {
            dispatch(fetchDeletePhone(item));
        });
        setSelected([]);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [action, setAction] = useState("Add");

    return (
        <>
            <Container>
                <UpdatePhoneDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    selectedPhone={selectedPhone}
                    action={action}
                />
                <DataTable
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    headCells={headCells}
                    data={phone}
                    selected={selected}
                    setSelected={setSelected}
                    tableBody={tableBody}
                    setAction={setAction}
                    handleDelete={handleDelete}
                ></DataTable>
            </Container>
        </>
    );
}
