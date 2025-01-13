import {createContext, useContext, useState} from "react";

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
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFile = async (selectedFile, username) => {
        try {
            if (!selectedFile) {
                throw new Error('No file selected');
            }

            setUploadProgress(0);

            const data = await getPresignedUrl(
                selectedFile.name,
                selectedFile.type,
                username
            );
            const body = JSON.parse(data.body);
            console.log(body);

            const { presignedUrl, key } = body;

            console.log('Uploading file to s3 with:', presignedUrl);

            await fetch(presignedUrl, {
                method: 'PUT',
                body: selectedFile,
                headers: {
                    'Content-Type': selectedFile.type,
                }
            });

            // Add file to state with S3 key
            const fileInfo = {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                key: key,
                uploadedAt: new Date().toISOString()
            };

            setFiles(prev => [...prev, fileInfo]);
            setFile(fileInfo);

            return fileInfo;

        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        } finally {
            setUploadProgress(0);
        }
    };

    return(
        <FileContext.Provider value={{
            file,
            files,
            setFile,
            setFiles,
            uploadProgress,
            uploadFile
        }}>
            {children}
        </FileContext.Provider>
    )
}
const getPresignedUrl = async (fileName, fileType, username) => {
    try {
        console.log('Getting presigned URL for:', fileName, fileType);
        const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName,
                fileType,
                username,
                'stage': 'dev'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get presigned URL');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};
