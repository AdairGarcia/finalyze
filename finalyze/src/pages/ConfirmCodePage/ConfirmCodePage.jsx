import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const ConfirmCodePage = () => {
  const { register, handleSubmit } = useForm();
  const { confirmCode } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const info = await confirmCode(data.code);
      if (info.statusCode === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error al confirmar código", error);
    }
  });

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Confirmar Código</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Código de Confirmación</label>
            <input
              type="text"
              placeholder="Ingresa el código de confirmación"
              className="form-control"
              autoComplete="off"
              {...register("code", { required: true })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Confirmar Código
          </button>
        </form>
      </div>
    </div>
  );
};
