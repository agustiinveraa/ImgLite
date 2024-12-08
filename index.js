import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

// Obtener el directorio actual en entornos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Multer para almacenamiento temporal
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: 'de9i16iit',
    api_key: '252157595913542',
    api_secret: 'SoTlCgWJlJ-fyQ2CblSoqnBeRH0',
});

app.post('/optimize', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Debes subir una imagen.');
    }

    const { quality, format } = req.body;
    const filePath = req.file.path;

    try {
        // Optimizar la imagen con Sharp
        const optimizedBuffer = await sharp(filePath)
            .toFormat(format || 'jpeg', { quality: parseInt(quality) || 80 })
            .toBuffer();

        // Subir la imagen optimizada a Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'optimized_images' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(optimizedBuffer);
        });

        // Enviar respuesta al cliente
        res.status(200).json({
            message: 'Imagen optimizada y subida con éxito.',
            cloudinaryUrl: uploadResult.secure_url, // Devuelve la URL de la imagen
        });
    } catch (error) {
        console.error('Error procesando la imagen:', error);
        res.status(500).send('Error al procesar la imagen.');
    } //finally {
    //     // Eliminar el archivo temporal
    //     fs.unlink(filePath, (err) => {
    //         if (err) console.error('Error eliminando el archivo temporal:', err);
    //     });
    // }
});


app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});
