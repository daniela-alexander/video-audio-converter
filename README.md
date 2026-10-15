# 🎬 Video to MP3 Extractor

Una aplicación web moderna, rápida y full-stack diseñada para extraer la pista de audio de archivos de video y convertirlos a formato MP3 de alta calidad de forma sencilla.

No requiere instalar ningún programa externo ni configurar variables de entorno en el sistema operativo: todo se gestiona automáticamente mediante binarios estáticos a través de NPM.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![NodeJS](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![FFmpeg](https://img.shields.io/badge/FFmpeg--Static-NPM-007800?logo=ffmpeg)

---

## ✨ Características

- 🎨 **Interfaz Moderna & Glassmorphism:** Diseño amplio en pantalla completa con soporte completo de Drag & Drop y animaciones fluidas.
- 📦 **100% Portable (Zero-Setup):** Incluye `ffmpeg-static` y `ffprobe-static` como dependencias de Node.js. No requiere instalar FFmpeg manualmente en el sistema operativo.
- 🔍 **Detección Inteligente de Audio:** Analiza los metadatos del video usando `ffprobe` antes de la conversión y devuelve un mensaje de error si el video no contiene pista de audio.
- 🧹 **Limpieza Automática:** Elimina de inmediato los archivos temporales generados en el servidor tras completar la descarga o en caso de error.

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React.js** (creado con **Vite**)
- **Axios** para peticiones HTTP multipart/form-data
- **CSS3** (Glassmorphism, Flexbox, CSS Grid y animaciones keyframe)

### Backend

- **Node.js** & **Express**
- **Multer** (Gestión de almacenamiento y subida de archivos)
- **Fluent-FFmpeg** (Envoltorio para comandos multimedia)
- **ffmpeg-static** & **ffprobe-static** (Binarios ejecutables precompilados)
- **CORS**

## ⚙️ Requisitos Previos

Únicamente necesitas tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (versión 18.0.0 o superior)
- **npm** (incluido por defecto al instalar Node.js)

---

## 🚀 Instalación y Ejecución Local

Sigue estos sencillos pasos para poner en marcha el proyecto:

### 1. Clonar el repositorio

git clone daniela-alexander/video-audio-converter
cd video-audio-converter

### 2. Iniciar el Backend (Servidor Express)

Abre una terminal y ejecuta:
cd backend
npm install
node server.js

El servidor backend se ejecutará en: http://localhost:5000

### 3. Iniciar el Frontend (Cliente React + Vite)

Abre una segunda terminal y ejecuta:
cd frontend
npm install
npm run dev

La aplicación web se abrirá en tu navegador en: http://localhost:5173

---

## 📁 Estructura del Proyecto

video-to-mp3-extractor/
├── backend/
│   ├── uploads/            # Archivos temporales (autolimpieables)
│   ├── package.json        # Incluye ffmpeg-static y ffprobe-static
│   └── server.js           # Lógica del servidor Express
│
└── frontend/
    ├── src/
    │   ├── App.jsx         # Componente principal con soporte Drag & Drop
    │   ├── App.css         # Estilos UI Glassmorphism en pantalla completa
    │   ├── index.css       # Estilos globales y animación de fondo
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js

---
