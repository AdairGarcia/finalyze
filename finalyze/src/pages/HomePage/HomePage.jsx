import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => () => {
        navigate(path);
    };

    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={handleNavigate("/signin")}>
                Login
            </button>
            <button onClick={handleNavigate("/signup")}>
                Register
            </button>
        </div>
    )
};