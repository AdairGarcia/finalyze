import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import {SignupPage} from "./pages/SignupPage/SignupPage.jsx";
import {SigninPage} from "./pages/SigninPage/SigninPage.jsx";
import {MainPage} from "./pages/MainPage/MainPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";

function App(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route path={"/signin"} element={<SigninPage />} />

                    <Route element={<ProtectedRoute/>}>
                        <Route path={"/files"} element={<MainPage />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;