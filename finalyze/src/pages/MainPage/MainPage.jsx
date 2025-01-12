import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import * as XLSX from "xlsx";
import {useFile} from "../../context/FileContext.jsx";
import {useForm} from "react-hook-form";

export const MainPage = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const { file, files, fileUpload, setFile} = useFile();
    const { register, handleSubmit } = useForm();

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data);
            console.log(data.file)
            const formData = new FormData();
            formData.append('file', data.file[0]);
            console.log(formData)


        } catch (error) {
            console.error("Error al subir archivo", error);
        }
    });

    return (
        <div>
            <h1>Main Page</h1>
            <button type="button" onClick={handleSignout}>
                Logout
            </button>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="file" accept=".xlsx, .xls"
                           {...register("file", { required: true })}
                    />
                    <button type={"submit"}>
                        Upload File
                    </button>
                </form>
            </div>
        </div>
    );
};