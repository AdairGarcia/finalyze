import {createContext, useContext, useEffect, useState} from "react";

export const FileContext = createContext();

export const useFile = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFile must be used within a FileProvider");
    }
    return context;
}

export const FileProvider = ({children}) => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    const fileUpload = async (excelFile) => {
        excelFile.preventDefault();

        if(!excelFile){
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', excelFile);

            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path: '/upload', httpMethod: 'POST',
                    body: JSON.stringify({ file })
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            const body = JSON.parse(data.body);
            setFile(body);
            return body;
        } catch (error) {
            throw error;
        }
    }

    return(
        <FileContext.Provider value={{
            file,
            files,
            setFile,
            setFiles
        }}>
            {children}
        </FileContext.Provider>
    )
}

