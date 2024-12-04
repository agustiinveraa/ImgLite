import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import os from 'os'; // Para directorios temporales

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(os.tmpdir(), 'uploads') });
const optimizedDir = path.join(os.tmpdir(), 'optimized');

// Crear el directorio "optimized" si no existe
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
}

app.post('/optimize', upload.array('image', 10), async (req, res) => {
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
            const outputPath = path.join(optimizedDir, `${file.originalname}.${format}`);

            await sharp(filePath)
                .toFormat(format, { quality: parseInt(quality) })
                .toFile(outputPath);

            optimizedImages.push({
                filename: `${file.originalname}.${format}`,
                url: `/optimized/${file.originalname}.${format}`,
            });

            try {
                fs.unlinkSync(filePath); // Limpiar archivo original
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

app.get('/optimized/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(optimizedDir, filename);

    if (fs.existsSync(filePath)) {
        res
            .set('Content-Type', `image/${path.extname(filename).slice(1)}`)
            .sendFile(filePath);
    } else {
        res.status(404).send('Imagen no encontrada.');
    }
});

export default app;
