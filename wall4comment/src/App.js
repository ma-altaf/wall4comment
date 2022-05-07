import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Hompage from "./pages/Hompage";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Hompage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
