import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const {signout} = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    return(
        <div>
            <h1>Main Page</h1>
            <button type={"button"} onClick={handleSignout}>
                Logout
            </button>
            <button>
                Subir archivo
            </button>
            <div>

            </div>
        </div>
    )
};