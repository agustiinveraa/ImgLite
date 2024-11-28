import { useState } from "react";
import axios from "axios";

function Form() {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(100);
    const [format, setFormat] = useState('webp');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file, quality, format);
        
        try {
            let formData = new FormData();
            formData.append('image', file);
            formData.append('quality', quality);
            formData.append('format', format);
            
            const response = await axios.post(
                'http://localhost:3001/optimize', 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            alert('Imagen optimizada guardada en: ' + response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <input
                type="number"
                placeholder="Quality (0-100)"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                min="0"
                max="100"
            />
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="webp">WEBP</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="avif">AVIF</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form