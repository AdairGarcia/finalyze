import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const info = await signup(data.username, data.email, data.password);
      const body = JSON.parse(info.body);

      if (!body.userConfirmed && info.statusCode === 200) {
        navigate("/signup/code");
      }
    } catch (error) {
      console.error("Error al registrarse", error);
    }
  });

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Regístrate</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Correo@ejemplo.com"
              className="form-control"
              {...register("email", { required: true })}
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
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
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa el password"
              className="form-control"
              {...register("password", { required: true })}
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        <p className="text-center mt-3">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/signin"} className="text-decoration-none">
            Ingresa aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
