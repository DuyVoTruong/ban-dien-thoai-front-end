import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading({ isLoading }) {
    return (
        <>
            {isLoading ? (
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}
        </>
    );
}
