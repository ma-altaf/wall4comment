import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Hompage from "./pages/Hompage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Hompage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
