const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);

const app = express();
app.use(cors());

const getRandomName = (ext) => {
    return `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
}

// Configuración de Multer para guardar temporales
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Conserva la extensión original (ej. .mp4, .mov, .mkv)
    const ext = path.extname(file.originalname);
    const uniqueName = getRandomName (ext);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

app.post('/extract-audio', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo de video.');
  }

  const inputPath = req.file.path;
  const outputPath = path.join('uploads', getRandomName(".mp3"));

  ffmpeg.ffprobe(inputPath, (err, metadata) => {
    if (err) {
      console.error('Error al analizar el video:', err);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      return res.status(500).send('No se pudo analizar el archivo de video.');
    }

    // Buscar si existe al menos un flujo de tipo "audio"
    const hasAudio = metadata.streams.some(stream => stream.codec_type === 'audio');

    if (!hasAudio) {
      // Limpiar el video subido y responder con un error de cliente
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      return res.status(400).send('El video seleccionado no contiene ninguna pista de audio.');
    }

    // Proceso de extracción con FFmpeg
  ffmpeg(inputPath)
    .toFormat('mp3')
    .on('end', () => {
      // Enviar el archivo MP3 para descarga
      res.download(outputPath, 'audio_extraido.mp3', (err) => {
        // Limpieza de archivos temporales
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      });
    })
    .on('error', (err) => {
      console.error('Error al procesar el video:', err);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      res.status(500).send('Error durante la conversión.');
    })
    .save(outputPath);
  });
});

app.listen(5000, () => {
  console.log('Servidor escuchando en http://localhost:5000');
});