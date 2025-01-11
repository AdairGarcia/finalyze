import { useForm } from 'react-hook-form';
import { useAuth } from "../../context/AuthContext.jsx";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

export const SigninPage = () => {
    const { register, handleSubmit} = useForm();
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        console.log("Signin: ", data);
        try {
            const info = await signin(data.username, data.password);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    });

    useEffect(() => {
        if(isAuthenticated){
            navigate('/files');
        }
    }, [isAuthenticated]);

    return (
        <div>
            <h1>Signin Page</h1>
            <form onSubmit={onSubmit}>
                <label>Username</label>
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
                    Iniciar sesión
                </button>
            </form>
            <p>
                ¿No tienes una cuenta?
                <Link to={"/signup"}>Ingresa aquí</Link>
            </p>
        </div>
    );
};
