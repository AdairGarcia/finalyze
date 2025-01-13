import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useForm } from "react-hook-form";

export const MainPage = () => {
    const { signout, user, token } = useAuth(); // Incluye el token desde el contexto
    const navigate = useNavigate();
    const { file, files, setFile, uploadFile } = useFile();
    const { register, handleSubmit } = useForm();

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log("Token actual en MainPage:", token); // Aquí verificas el token antes de usarlo
    
            if (!token || !token.accessToken) {
                throw new Error("Token no definido. Por favor, inicia sesión nuevamente.");
            }
    
            const file = data.file[0];
            const formData = new FormData();
            formData.append('file', file);
    
            console.log("Enviando archivo:", file);
    
            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/files', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al subir el archivo.");
            }
    
            const result = await response.json();
            console.log("Archivo subido correctamente:", result);
    
            alert("Archivo subido y procesado correctamente.");
        } catch (error) {
            console.error("Error al subir archivo:", error);
            alert(`Error: ${error.message}`);
        }
    });
    
    return (
        <div>
            <h1>Subir Archivo</h1>
            <button type="button" onClick={handleSignout}>
                Logout
            </button>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        {...register("file", { required: true })}
                    />
                    <button type="submit">Upload File</button>
                </form>
            </div>
        </div>
    );
};
