import Sidebar from "../../components/Sidebar";

function DefaultLayout({ children }) {
    return (
        <div>
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;