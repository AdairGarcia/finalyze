import { useAuth } from "../../context/AuthContext.jsx"; 
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useForm } from "react-hook-form";
import {ContainerFile} from "./Components/ContainerFile.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export const MainPage = () => {
    const { signout, user } = useAuth();
    const navigate = useNavigate();
    const { files, setFiles, uploadFile, getUserFiles, deleteFile } = useFile();
    const { register, handleSubmit } = useForm();
    const [showFiles, setShowFiles] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/'); // Redirige a la página de inicio
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    }

    const handleViewFiles = async () => {
        try {
            const files = await getUserFiles(user);
            console.log("files:", files);
        } catch (error) {
            console.error("Error al eliminar archivo", error);
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            await uploadFile(data.file[0], user);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
            await getUserFiles(user); // Actualiza la lista de archivos después de subir
        } catch (error) {
            console.error("Error al subir archivo", error);
        }
    });

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <nav className="navbar navbar-light bg-light w-100">
                <div className="container">
                    <button 
                        className="btn btn-danger me-2" 
                        onClick={handleSignout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div 
                className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                    background: "linear-gradient(to top, #1e3c72, #2a5298, #ffffff)",
                    color: "#ffffff",
                    textShadow: "1px 1px 5px rgba(0,0,0,0.5)"
                }}
            >
                <h1 className="display-1 fw-bold">Main Page</h1>
                <p className="lead">Manage your files and view uploads with ease.</p>
                <form className="w-50" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <input 
                            type="file" 
                            accept=".xlsx, .xls" 
                            name="file"
                            className="form-control"
                            {...register("file", { required: true })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Upload File
                    </button>
                </form>
                {uploadSuccess && (
                    <div className="alert alert-success mt-3" role="alert">
                        File uploaded successfully!
                    </div>
                )}
                <button 
                    className="btn btn-secondary mt-3" 
                    onClick={toggleViewFiles}
                >
                    {showFiles ? "Ocultar archivos" : "Ver archivos"}
                </button>
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
