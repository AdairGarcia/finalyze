import { useParams } from "react-router-dom";
import { useFile } from "../../context/FileContext.jsx";
import {useEffect} from "react";
import {useAuth} from "../../context/AuthContext.jsx";

export const FileDetailPage = () => {
    const { fileId } = useParams();
    const { file, getUserFile } = useFile();
    const { user } = useAuth();

    useEffect(() => {
        getUserFile(user, fileId);
        console.log("file:", file);
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
        </div>
    );
};