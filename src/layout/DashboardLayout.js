import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const listItemSellerDrawer = [
    {
        icon: <PhoneAndroidIcon />,
        title: "Phone",
        list: [
            {
                icon: <AddBoxIcon />,
                title: "Add",
            },
            {
                icon: <DeleteIcon />,
                title: "Delete",
            },
            {
                icon: <ChangeCircleIcon />,
                title: "Update",
            },
        ],
    },
    {
        icon: <FeaturedPlayListIcon />,
        title: "Brand",
    },
    {
        icon: <StorageIcon />,
        title: "Rom",
    },
    {
        icon: <MemoryIcon />,
        title: "Ram",
    },
    {
        icon: <InsertChartIcon />,
        title: "Statistics",
    },
];

const listItemAdminDrawer = [
    {
        icon: <PhoneAndroidIcon />,
        title: "Phone",
        list: [
            {
                icon: <AddBoxIcon />,
                title: "Add",
            },
            {
                icon: <DeleteIcon />,
                title: "Delete",
            },
            {
                icon: <ChangeCircleIcon />,
                title: "Update",
            },
        ],
    },
    {
        icon: <PhoneAndroidIcon />,
        title: "Phone",
        list: [
            {
                icon: <AddBoxIcon />,
                title: "Add",
            },
            {
                icon: <DeleteIcon />,
                title: "Delete",
            },
            {
                icon: <ChangeCircleIcon />,
                title: "Update",
            },
        ],
    },
    {
        icon: <FeaturedPlayListIcon />,
        title: "Brand",
    },
    {
        icon: <StorageIcon />,
        title: "Rom",
    },
    {
        icon: <MemoryIcon />,
        title: "Ram",
    },
    {
        icon: <InsertChartIcon />,
        title: "Statistics",
    },
    {
        icon: <AccountBoxIcon />,
        title: "Account",
    },
];

export default function DashBoardLayout() {
    const account = useSelector((state) => state.account.value);

    return (
        <>
            {account.role === "ADMIN" ? (
                <ResponsiveDrawer listItemDrawer={listItemAdminDrawer}>
                    <Outlet />
                </ResponsiveDrawer>
            ) : (
                <ResponsiveDrawer listItemDrawer={listItemSellerDrawer}>
                    <Outlet />
                </ResponsiveDrawer>
            )}
        </>
    );
}
