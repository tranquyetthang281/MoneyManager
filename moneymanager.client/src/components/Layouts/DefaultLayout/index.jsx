import { Grid } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
}

export default DefaultLayout;