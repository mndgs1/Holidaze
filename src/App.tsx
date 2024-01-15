import "./index.css";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Properties from "./pages/Properties";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Page404 />} />
                <Route path="/properties" element={<Properties />} />
            </Routes>
        </Layout>
    );
}
export default App;
