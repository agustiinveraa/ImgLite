import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import os from 'os'; // Para directorios temporales
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors({ origin: 'https://img-lite.vercel.app/' }));
app.use(express.json());

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: 'de9i16iit',
    api_key: '252157595913542',
    api_secret: 'SoTlCgWJlJ-fyQ2CblSoqnBeRH0',
});

// Configuración de Multer
const upload = multer({ dest: path.join(os.tmpdir(), 'uploads') });

app.post('/api/optimize', upload.array('image', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Debes subir al menos 1 imagen.');
    }

    if (req.files.length > 10) {
        return res.status(400).send('No puedes subir más de 10 imágenes.');
    }

    try {
        const { quality, format } = req.body;
        const optimizedImages = [];

        for (const file of req.files) {
            const filePath = file.path;

            // Subir la imagen a Cloudinary con transformación
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                transformation: [
                    { quality: parseInt(quality) },
                    { fetch_format: format },
                ],
                folder: 'optimized_images', // Carpeta en Cloudinary
            });

            optimizedImages.push({
                filename: uploadResponse.original_filename,
                url: uploadResponse.secure_url,
            });

            try {
                fs.unlinkSync(filePath); // Limpiar archivo temporal
            } catch (err) {
                console.error(`Error limpiando archivos: ${err.message}`);
            }
        }

        res.json(optimizedImages);
    } catch (error) {
        console.error('Error optimizando imágenes:', error);
        res.status(500).send('Error al procesar las imágenes.');
    }
});

app.get('/api/optimized/:filename', (req, res) => {
    const { filename } = req.params;

    // Asume que el archivo está en la carpeta "optimized_images" de Cloudinary
    const cloudinaryUrl = `https://res.cloudinary.com/de9i16iit/image/upload/v1733529093/optimized_images/${filename}`;

    res.redirect(cloudinaryUrl); // Redirige al usuario a la URL de Cloudinary
});


export default app;
