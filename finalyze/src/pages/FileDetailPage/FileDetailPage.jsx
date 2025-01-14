import { useParams } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import {useEffect} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

export const FileDetailPage = () => {
    const { fileId } = useParams();
    const { file, getUserFile, getMovements, getPercentils } = useFile();
    const { user } = useAuth();

    const handleOnMovements = async () => {
        try {
            const movements = await getMovements(user, fileId);
            console.log("movements:", movements);
        } catch (error) {
            console.error("Error al obtener movimientos", error);
        }
    };

    const handleOnPercentils = async () => {
        try {
            const percentils = await getPercentils(user, fileId);
            console.log("percentils:", percentils);
        } catch (error) {
            console.error("Error al obtener percentiles", error);
        }
    }

    useEffect(() => {
        getUserFile(user, fileId);
    }, []);

    if (!file) {
        return <div>File not found</div>;
    }

    return (
        <div>
            <h1>File Details</h1>
            {Object.entries(file).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
            <button onClick={handleOnMovements}>
                Ver movimientos
            </button>
            <button onClick={handleOnPercentils}>
                Calcular percentiles
            </button>
        </div>
    );
};