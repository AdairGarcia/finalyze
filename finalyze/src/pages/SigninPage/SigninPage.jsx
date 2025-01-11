import { useForm } from 'react-hook-form';
import { useAuth } from "../../context/AuthContext.jsx";

export const SigninPage = () => {
    const { register, handleSubmit} = useForm();
    const { signin } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        console.log("Signin: ", data);
        try {
            const info = await signin(data.username, data.password);

            console.log("Data: ", info);
            console.log("Usuario logueado YUPIII");
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    });

    return (
        <div>
            <h1>Signin Page</h1>
            <form onSubmit={onSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Ingresa el username"
                    {...register("username", {required:true})}
                    autoComplete="off"
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Ingresa el password"
                    autoComplete="off"
                    {...register("password", {required:true})}
                />
                <button type="submit">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};
