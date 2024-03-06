import Sidebar from "../../components/Sidebar";

function DefaultLayout({ currentKey, children }) {
    return (
        <div>
            <Sidebar currentKey={currentKey} />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;