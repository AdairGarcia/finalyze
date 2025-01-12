import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

export const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => () => {
        navigate(path);
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            {/* Barra de navegación con botones */}
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleNavigate("/signin")}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleNavigate("/signup")}
                    >
                        Register
                    </button>
                </div>
            </nav>

            {/* Contenido central */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="display-1 fw-bold">Finalyze</h1>
                <p className="lead">Analyze your financial transactions with ease.</p>
            </div>

            {/* Imagen de fondo */}
            <div
                className="bg-image"
                style={{
                    backgroundImage: `url("/assets/finance-image.jpg")`, // Cambia esta URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "40vh",
                }}
            ></div>
        </div>
    );
};