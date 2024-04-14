import Header from "../components/Header";

function OnlyHeaderLayout({ children }) {

    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default OnlyHeaderLayout;    