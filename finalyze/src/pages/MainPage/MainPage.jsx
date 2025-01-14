import { useAuth } from "../../context/AuthContext.jsx"; 
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useForm } from "react-hook-form";
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

    const toggleViewFiles = async () => {
        if (!showFiles) {
            try {
                await getUserFiles(user);
            } catch (error) {
                console.error("Error al obtener archivos", error);
            }
        }
        setShowFiles(!showFiles);
    }

    const handleDeleteFile = async (fileId) => {
        try {
            await deleteFile(fileId);
            setFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
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

            {showFiles && (
                <div className="container mt-5">
                    <h2>Uploaded Files</h2>
                    <ul className="list-group">
                        {files.map((file, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {Object.entries(file).map(([key, value]) => (
                                        <div key={key}>{key}: {value}</div>
                                    ))}
                                </div>
                                <div className="d-flex">
                                    <button 
                                        className="btn btn-info btn-sm me-2" 
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Analyze
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleDeleteFile(file.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <footer className="container-fluid bg-dark text-light text-center p-3 mt-auto">
                <p>
                    <a
                        href="https://github.com/AdairGarcia/finalyze.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light"
                    >
                        GitHub Repository
                    </a>
                </p>
            </footer>
        </div>
    );
};
