import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute(){
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace/>;
    }

    return(
        <Outlet/>
    )
}

export default ProtectedRoute;