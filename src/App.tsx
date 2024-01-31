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
import CreateListing from "./pages/CreateListing";
import About from "./pages/About";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Page404 />} />
                <Route path="app/properties" element={<Properties />} />
                <Route path="app/profile" element={<Profile />} />
                <Route path="app/Property/:id" element={<PropertyPage />} />
                <Route path="app/bookings" element={<Bookings />} />
                <Route path="app/myProperties" element={<MyProperties />} />
                <Route
                    path="app/myProperties/create"
                    element={<CreateListing />}
                />
                <Route path="/about" element={<About />} />
            </Routes>
        </Layout>
    );
}
export default App;
