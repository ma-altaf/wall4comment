import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthWrapper } from "./API/auth";
import Error from "./pages/Error";
import Hompage from "./pages/Hompage";
import PostView from "./pages/PostView";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <AuthWrapper>
                <Routes>
                    <Route path="/" exact element={<Hompage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/postView/:postID" element={<PostView />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </AuthWrapper>
        </BrowserRouter>
    );
}

export default App;
