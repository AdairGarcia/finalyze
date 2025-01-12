import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './signupPage.css';

export const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showValidations, setShowValidations] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    symbol: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setValidations({
      length: value.length >= 8,
      number: /\d/.test(value),
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  return (
      <div
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100vh", // Asegura que cubra todo el alto visible
            backgroundColor: "#f8f9fa", // Fondo blanco/gris claro
            padding: "20px", // Espaciado para pantallas pequeñas
          }}
      >
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa el password"
                  className="form-control"
                  {...register("password", { required: true })}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setShowValidations(true)}
                  autoComplete="off"
              />
            </div>
            {showValidations && (
                <div className="password-validations">
                  <p className={validations.length ? 'valid' : 'invalid'}>La contraseña debe tener al menos 8 caracteres</p>
                  <p className={validations.number ? 'valid' : 'invalid'}>Usa un número</p>
                  <p className={validations.lowercase ? 'valid' : 'invalid'}>Utiliza una letra minúscula</p>
                  <p className={validations.uppercase ? 'valid' : 'invalid'}>Utiliza una letra mayúscula</p>
                  <p className={validations.symbol ? 'valid' : 'invalid'}>Utiliza algún símbolo</p>
                </div>
            )}

            <div className="mb-3">
              <label className="form-label">Confirmar Contraseña</label>
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirma el password"
                  className="form-control"
                  {...register("confirmPassword", { required: true })}
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