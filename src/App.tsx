import "./index.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" index element={<HomePage />} />
            </Routes>
        </Layout>
    );
}
export default App;
