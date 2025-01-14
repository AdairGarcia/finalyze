import { useParams } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export const FileDetailPage = () => {
    const { fileId } = useParams();
    const { file, getUserFile, getMovements, getPercentils } = useFile();
    const { user } = useAuth();
    const [movements, setMovements] = useState(null);
    const [percentiles, setPercentiles] = useState(null);

    const handleOnMovements = async () => {
        try {
            const fetchedMovements = await getMovements(user, fileId);
            setMovements(fetchedMovements); // Guarda los movimientos en el estado
        } catch (error) {
            console.error("Error al obtener movimientos", error);
            setMovements([]); // Maneja el error, por ejemplo, estableciendo un array vacío
        }
    };

    const handleOnPercentiles = async () => {
        try {
            const fetchedPercentiles = await getPercentils(user, fileId);
            setPercentiles(fetchedPercentiles); // Guarda los percentiles en el estado
        } catch (error) {
            console.error("Error al obtener percentiles", error);
            setPercentiles([]); // Maneja el error
        }
    };

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
            {movements && ( // Renderiza los movimientos si existen
                <div>
                    <h2>Movimientos:</h2>
                    <pre>{JSON.stringify(movements, null, 2)}</pre> {/* Formato legible */}
                </div>
            )}
            <button onClick={handleOnPercentiles}>
                Calcular percentiles
            </button>
            {percentiles && ( // Renderiza los percentiles si existen
                <div>
                    <h2>Percentiles:</h2>
                    <pre>{JSON.stringify(percentiles, null, 2)}</pre> {/* Formato legible */}
                </div>
            )}
        </div>
    );
};