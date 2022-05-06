import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hompage from "./pages/Hompage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Hompage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
