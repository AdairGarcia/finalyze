import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const ConfirmCodePage = () => {
    const { register, handleSubmit} = useForm();
    const { confirmCode } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const info = await confirmCode(data.code);
            if(info.statusCode === 200){
                navigate("/signin");
            }
        } catch (error) {
            console.error("Error al confirmar código", error);
        }
    });

    return (
        <div>
            <h1>Confirm Code Page</h1>
            <form onSubmit={onSubmit}>

            <label>Código de confirmación</label>
                <input
                    type="text"
                    placeholder="Ingresa el código de confirmación"
                    {...register("code", { required: true })}
                />
                <button type="submit">
                    Confirmar código
                </button>

            </form>
        </div>
    );
}