import { useForm } from 'react-hook-form';
import { useAuth } from "../../context/AuthContext.jsx";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SigninPage = () => {
    const { register, handleSubmit } = useForm();
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    const onSubmit = handleSubmit(async (data) => {
      try {
        await signin(data.username, data.password);
      } catch (error) {
        console.error("Error al iniciar sesión", error);
      }
    });
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/files");
      }
    }, [isAuthenticated]);
  
    return (
      <div className="container vh-100 d-flex align-items-center justify-content-center">
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
                type="password"
                placeholder="Ingresa el password"
                className="form-control"
                {...register("password", { required: true })}
                autoComplete="off"
              />
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