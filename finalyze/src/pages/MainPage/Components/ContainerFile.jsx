import { Link } from "react-router-dom";

export const ContainerFile = ({ file }) => {

    const getFileName = (file) => {
        if (!file || !file.sk) {
            return "Unknown file";
        }
        const key = file.sk;
        const splitKey = key.split('-');
        return splitKey[splitKey.length - 1];
    }

    return (
        <div className="file-Container">
            <p>{file.name}</p>
            <p>
                <Link to={`/file/${encodeURIComponent(file.sk)}`}>
                    {getFileName(file)}
                </Link>
            </p>
        </div>
    );
};