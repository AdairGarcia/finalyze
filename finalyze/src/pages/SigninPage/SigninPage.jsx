import { useForm } from 'react-hook-form';
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SigninPage.css";

export const SigninPage = () => {
    const { register, handleSubmit } = useForm();
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const info = await signin(data.username, data.password);
            if (info.statusCode === 200) {
                console.log("Inicio de sesión exitoso");
            } else if (info.statusCode === 500) {
                console.log("Message:", info.message);
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/files');
        }
    }, [isAuthenticated]);

    return (
        <div 
            className="vh-100 vw-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(to top, #1e3c72, #2a5298, #ffffff)",
                color: "#ffffff",
            }}
        >
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="text-center mb-4">Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Ingresa el username"
                            className="form-control"
                            {...register("username", { required: true })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresa el password"
                            className="form-control"
                            {...register("password", { required: true })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">Mostrar Contraseña</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Iniciar sesión
                    </button>
                </form>

                <p className="text-center mt-3">
                    ¿No tienes una cuenta?{" "}
                    <Link to={"/signup"} className="text-decoration-none">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};