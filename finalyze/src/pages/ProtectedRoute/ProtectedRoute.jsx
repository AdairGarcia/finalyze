import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute(){
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return(
            <div>
                <h1>
                    Cargando...
                </h1>
            </div>
        );
    }

    if (!isAuthenticated && !loading){
        return <Navigate to="/signin" replace/>;
    }

    return(
        <Outlet/>
    )
}

export default ProtectedRoute;