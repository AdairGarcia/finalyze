import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const SignupPage = () => {
    const { register, handleSubmit} = useForm();
    const { signup } = useAuth();
    const navigate= useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const info = await signup(data.username, data.email, data.password);
            const body = JSON.parse(info.body);

            if(!body.userConfirmed && info.statusCode === 200){
                navigate("/signup/code");
            }

        } catch (error) {
            console.error("Error al registrarse", error);
        }
    });

    return(
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input
                    type={"email"}
                    name={"email"}
                    placeholder={"Correo@ejemplo.com"}
                    autoComplete={"off"}
                    {...register("email", {required: true})}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Ingresa el username"
                    {...register("username", {required: true})}
                    autoComplete="off"
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Ingresa el password"
                    autoComplete="off"
                    {...register("password", {required: true})}
                />
                <button type="submit">
                    Registrarse
                </button>


            </form>
        </div>
    )
};