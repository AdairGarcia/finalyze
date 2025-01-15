import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import {SignupPage} from "./pages/SignupPage/SignupPage.jsx";
import {SigninPage} from "./pages/SigninPage/SigninPage.jsx";
import {MainPage} from "./pages/MainPage/MainPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";
import {ConfirmCodePage} from "./pages/ConfirmCodePage/ConfirmCodePage.jsx";
import {FileProvider} from "./context/FileContext.jsx";
import {FileDetailPage} from "./pages/FileDetailPage/FileDetailPage.jsx";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage.jsx";

function App(){
    return(
        <AuthProvider>
            <FileProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route path={"/signin"} element={<SigninPage />} />
                    <Route path={"/signup/code"} element={<ConfirmCodePage />} />
                    <Route element={<ProtectedRoute/>}>
                        <Route path={"/files"} element={<MainPage />} />
                        <Route path={"/file/:fileId"} element={<FileDetailPage />} />
                    </Route>

                </Routes>
            </BrowserRouter>
            </FileProvider>
        </AuthProvider>
    )
}

export default App;