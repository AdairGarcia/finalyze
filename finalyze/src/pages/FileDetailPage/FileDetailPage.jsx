import { useParams } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export const FileDetailPage = () => {
    const { fileId } = useParams();
    const { file, getUserFile, getMovements, getPercentils } = useFile();
    const { user } = useAuth();

    // Estados para almacenar los movimientos y percentiles
    const [movements, setMovements] = useState([]);
    const [percentils, setPercentils] = useState([]);
    const [loadingMovements, setLoadingMovements] = useState(false);
    const [loadingPercentils, setLoadingPercentils] = useState(false);

    const handleOnMovements = async () => {
        try {
            setLoadingMovements(true);
            const fetchedMovements = await getMovements(user, fileId);
            setMovements(fetchedMovements);
        } catch (error) {
            console.error("Error al obtener movimientos", error);
        } finally {
            setLoadingMovements(false);
        }
    };

    const handleOnPercentils = async () => {
        try {
            setLoadingPercentils(true);
            const fetchedPercentils = await getPercentils(user, fileId);
            setPercentils(fetchedPercentils);
        } catch (error) {
            console.error("Error al obtener percentiles", error);
        } finally {
            setLoadingPercentils(false);
        }
    };

    useEffect(() => {
        getUserFile(user, fileId);
    }, []);

    if (!file) {
        return <div>File not found</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Detalles del Archivo</h1>
            <div className="card shadow p-4 mb-4">
                {Object.entries(file).map(([key, value]) => (
                    <div key={key} className="mb-2">
                        <strong>{key}:</strong> {value}
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <button 
                    onClick={handleOnMovements} 
                    className="btn btn-primary me-2"
                    disabled={loadingMovements}
                >
                    {loadingMovements ? "Cargando movimientos..." : "Ver Movimientos"}
                </button>
                <button 
                    onClick={handleOnPercentils} 
                    className="btn btn-secondary"
                    disabled={loadingPercentils}
                >
                    {loadingPercentils ? "Calculando percentiles..." : "Calcular Percentiles"}
                </button>
            </div>
            {movements.length > 0 && (
                <div className="card shadow p-4 mb-4">
                    <h3>Movimientos</h3>
                    <ul>
                        {movements.map((movement, index) => (
                            <li key={index}>{JSON.stringify(movement)}</li>
                        ))}
                    </ul>
                </div>
            )}
            {percentils.length > 0 && (
                <div className="card shadow p-4">
                    <h3>Percentiles</h3>
                    <ul>
                        {percentils.map((percentil, index) => (
                            <li key={index}>{JSON.stringify(percentil)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
