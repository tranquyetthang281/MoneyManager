import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import { Fragment, useContext } from 'react';
import { AuthContext } from "./components/AuthProvider";

function PrivateRoute({ children }) {
    const { auth } = useContext(AuthContext)

    if (!auth) {
        return <Navigate to="/login" />
    }

    return children
}

function App() {

    return (
        <Router>
            <div className="App">
                <Routes>
                    {
                        privateRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })
                    }
                    {
                        publicRoutes.map((route, index) => {
                            const Page = route.component
                            return <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        })
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default App;