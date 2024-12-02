import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import axios from 'axios';
import cors from 'cors';

// TODO: Optimizar codigo

// Obtener el directorio actual en entornos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para subir imágenes

// Crear el directorio "optimized" si no existe
const optimizedDir = path.join(__dirname, 'optimized');
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
}

app.use(express.json());

app.post('/optimize', upload.single('image'), async (req, res) => {
    const { quality, format } = req.body;
    const filePath = req.file.path;
    const outputPath = path.join(optimizedDir, `${req.file.originalname}.${format}`);

    try {

        await sharp(filePath)
            .toFormat(format, { quality: parseInt(quality) })
            .toFile(outputPath);

        // Leer el archivo optimizado y enviarlo como respuesta
        const optimizedImage = fs.readFileSync(outputPath);

        // // Limpiar archivos temporales
        // fs.unlinkSync(filePath);
        // fs.unlinkSync(outputPath);

        
        res.set('Content-Type', `image/${format}`);
        res.send(optimizedImage);
    } catch (error) {
        console.error('Error optimizando imagen:', error);
        res.status(500).send('Error al procesar la imagen.');
    }
});

app.get('/optimized/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(optimizedDir, filename);

    if (fs.existsSync(filePath)) {
        res
            .set('Content-Type', `image/${path.extname(filename).slice(1)}`)
            .sendFile(filePath);
    } else {
        res.status(404).send('Imagen no encontrada');
    }
});

app.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});
