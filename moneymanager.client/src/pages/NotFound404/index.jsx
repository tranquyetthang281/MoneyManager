import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound404() {
    return (
        <Stack sx={{ background: "#fff", width: "100%", height: "100vh" }}
            justifyContent={"center"} alignItems={"center"}>
            <Typography sx={{ fontSize: "100px" }}>404</Typography>
            <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" style={{ height: "300px" }}></img>
            <Typography sx={{ fontSize: "30px" }}>Look like you're lost</Typography>
            <Typography sx={{ fontSize: "20px" }}>the page you are looking for not available!</Typography>
            <Link to="/">
                <Button sx={{
                    color: "#fff", 
                    background: "rgb(45, 184, 76)",
                    mt: "20px",
                    "&:hover": {
                        background: "rgb(45, 184, 76, 0.6)"
                    }
                }}>
                    Go to Home
                </Button>
            </Link>
        </Stack>
    );
}

export default NotFound404;