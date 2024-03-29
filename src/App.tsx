import "./index.css";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Properties from "./pages/Properties";
import Profile from "./pages/Profile";
import PropertyPage from "./pages/PropertyPage";
import Bookings from "./pages/Bookings";
import MyProperties from "./pages/MyProperties";
import About from "./pages/About";
import CreatePropertyListing from "./pages/CreatePropertyListing";
import EditMyProperty from "./pages/EditMyProperty";
import MyProperty from "./pages/MyProperty";
import AuthWrapper from "./components/layout/AuthWrap";
import { HelmetProvider } from "react-helmet-async";
import Search from "./pages/Search";

function App() {
    return (
        <HelmetProvider>
            <Layout>
                <AuthWrapper>
                    <Routes>
                        <Route path="/" index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="*" element={<Page404 />} />
                        <Route path="/about" element={<About />} />

                        <Route
                            path="holidaze/properties"
                            element={<Properties />}
                        />
                        <Route path="holidaze/profile" element={<Profile />} />
                        <Route
                            path="holidaze/properties/:id"
                            element={<PropertyPage />}
                        />
                        <Route
                            path="holidaze/bookings"
                            element={<Bookings />}
                        />
                        <Route
                            path="holidaze/myProperties"
                            element={<MyProperties />}
                        />
                        <Route
                            path="holidaze/myProperties/edit/:id"
                            element={<EditMyProperty />}
                        />
                        <Route
                            path="holidaze/myProperties/create"
                            element={<CreatePropertyListing />}
                        />
                        <Route
                            path="/holidaze/myProperties/:id"
                            element={<MyProperty />}
                        />
                        <Route
                            path="/holidaze/properties/search/:search"
                            element={<Search />}
                        />
                    </Routes>
                </AuthWrapper>
            </Layout>
        </HelmetProvider>
    );
}
export default App;
