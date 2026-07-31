// src/App.jsx
import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Soporte para Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 1)';
    e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragLeave(e); // Resetear estilos
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      } else {
        alert('Por favor, arrastra solo archivos de video.');
      }
    }
  };

  const openFileBrowser = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/extract-audio', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${file.name.split('.')[0]}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conversión. Revisa la consola o el backend.');
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para formatear tamaño de archivo
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="main-viewport">
      {/* Input de archivo real, oculto */}
      <input
        type="file"
        ref={fileInputRef}
        className="file-input-hidden"
        accept="video/*"
        onChange={handleFileChange}
      />

      <div className="glass-card">
        {/* Header */}
        <header className="app-header">
          <h1 className="main-title">Extractor de Audio</h1>
          <p className="main-subtitle">Convierte tus videos a MP3 en segundos</p>
        </header>

        {/* Paso 1: Zona de Carga / Drag & Drop */}
        <div 
          className="drop-zone"
          onClick={openFileBrowser}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="file-selected-ui">
              <span className="file-icon">🎬</span>
              <div>
                <span className="file-name">{file.name}</span>
                <div className="file-size">{formatBytes(file.size)}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="upload-icon-large">☁️</div>
              <p className="drop-text-primary">Arrastra tu video aquí</p>
              <p className="drop-text-secondary">o haz clic para buscar</p>
            </>
          )}
        </div>

        {/* Paso 2: Botón de Acción */}
        <button
          className="btn-convert-glowing"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <div className="loader-spinner"></div>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>Convertir y Descargar MP3</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;