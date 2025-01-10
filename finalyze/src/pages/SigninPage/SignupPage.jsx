import {useForm} from "react-hook-form";

export const SignupPage = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
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
                    Iniciar sesión
                </button>


            </form>
        </div>
    )
};