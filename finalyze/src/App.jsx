import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import {SignupPage} from "./pages/SigninPage/SignupPage.jsx";
import {SigninPage} from "./pages/SignupPage/SigninPage.jsx";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/signup"} element={<SignupPage />} />
                <Route path={"/signin"} element={<SigninPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;