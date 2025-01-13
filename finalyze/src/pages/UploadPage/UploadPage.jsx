import React, { useState } from "react";
import { uploadFile } from "../../context/api";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor selecciona un archivo.");
      return;
    }

    try {
      setMessage("Subiendo archivo...");
      const result = await uploadFile(file);
      setMessage(`Archivo procesado correctamente: ${result.message}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Subir Archivo Excel</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPage;
