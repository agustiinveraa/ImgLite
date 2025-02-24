import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import os from "os"; // Para directorios temporales
import fs from "fs";
import path from "path";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "de9i16iit",
  api_key: "252157595913542",
  api_secret: "SoTlCgWJlJ-fyQ2CblSoqnBeRH0",
});

// Configuración de Multer
const upload = multer({ dest: path.join(os.tmpdir(), "uploads") });

app.post("/api/optimize", upload.array("image", 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Debes subir al menos 1 imagen.");
  }

  if (req.files.length > 10) {
    return res.status(400).send("No puedes subir más de 10 imágenes.");
  }

  try {
    const { quality, format } = req.body;
    const optimizedImages = [];

    for (const file of req.files) {
      const filePath = file.path;
      const originalFilename = file.originalname;

      // Upload to Cloudinary with transformation
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        transformation: [
          { quality: parseInt(quality) },
          { fetch_format: format },
        ],
        folder: "optimized_images",
        public_id: originalFilename.split('.')[0] // Use original filename without extension
      });

      optimizedImages.push({
        originalName: originalFilename,
        format: format
      });

      try {
        fs.unlinkSync(filePath); // Limpiar archivo temporal
      } catch (err) {
        console.error(`Error limpiando archivos: ${err.message}`);
      }
    }

    res.json(optimizedImages);
  } catch (error) {
    console.error("Error optimizing images:", error);
    res.status(500).send("Error processing images.");
  }
});

// Remove the /api/optimized/:filename endpoint as we won't need it anymore
app.get("/api/optimized/:filename", (req, res) => {
  const { filename } = req.params;

  // Asume que el archivo está en la carpeta "optimized_images" de Cloudinary
  const cloudinaryUrl = `https://res.cloudinary.com/de9i16iit/image/upload/v1740417749/optimized_images/${filename}`;

  res.redirect(cloudinaryUrl); // Redirige al usuario a la URL de Cloudinary
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
