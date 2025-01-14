import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useForm } from "react-hook-form";
import {ContainerFile} from "./Components/ContainerFile.jsx";
import { useState } from "react";

export const MainPage = () => {
    const { signout, user } = useAuth();
    const navigate = useNavigate();
    const { file, files, setFile, uploadFile, getUserFiles } = useFile();
    const { register, handleSubmit } = useForm();

    const [transactions, setTransactions] = useState(null);
    const [percentiles, setPercentiles] = useState(null);

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/'); 
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    const handleViewFiles = async () => {
        try {
            const files = await getUserFiles(user);
            console.log("files:", files);
        } catch (error) {
            console.error("Error al obtener archivos", error);
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data);
            console.log(data.file)
            const info = await uploadFile(data.file[0], user);
            console.log(info);
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
                    <input type="file" accept=".xlsx, .xls" name={"file"}
                           {...register("file", { required: true })}
                    />
                    <button type={"submit"}>
                        Upload File
                    </button>
                </form>
            </div>

            <button onClick={handleViewFiles}>
                Ver archivos
            </button>

            <div>
                <h2>Uploaded Files</h2>
                    {files.map((file, index) => (
                        <div key={index}>
                            <ContainerFile file={file}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};