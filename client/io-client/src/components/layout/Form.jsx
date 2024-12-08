import { useState } from "react";
import axios from "axios";
import SubmitButton from "../ui/SubmitButton";
import 'alertifyjs/build/css/alertify.css';

function Form() {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(100);
    const [format, setFormat] = useState('webp');
    const [optimized, setOptimized] = useState(false);
    const [cloudinaryRes, setCloudinaryRes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData();
            formData.append('image', file);
            formData.append('quality', quality);
            formData.append('format', format);

            const response = await axios.post('http://localhost:3001/optimize', formData);

            if (response.status === 200) {
                // Asignar la URL de Cloudinary al estado
                setCloudinaryRes(response.data.cloudinaryUrl);
                setOptimized(true);
            } else {
                setOptimized(false);
                console.log("Error");
            }
        } catch (error) {
            console.error("Error durante la optimización:", error);
        }
    };

    return (
        <>
            {!optimized ? (
                <form onSubmit={handleSubmit}>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-gray-900 border-gray-700 rounded-lg p-10">
                        <div className="flex justify-center gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="quality" className="text-lg p-2 text-white">Choose quality (0-100): </label>
                                <input
                                    className="bg-gray-800 px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-blue-500 border-gray-600"
                                    type="number"
                                    placeholder="(0-100)"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="format" className="text-lg p-2 text-white">Choose format: </label>
                                <select
                                    className="bg-gray-800 px-4 py-3 min-h-[52px] outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-blue-500 border-gray-600"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                >
                                    <option value="webp">WEBP</option>
                                    <option value="jpg">JPG</option>
                                    <option value="png">PNG</option>
                                    <option value="avif">AVIF</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center w-full max-w-xs items-center gap-1.5 mx-auto pt-5">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="flex h-10 w-full rounded-md border border-input bg-gray-800 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-400 file:text-sm file:font-medium"
                            />
                        </div>
                        <br />
                        <div className="flex justify-center pt-8">
                        <button type="submit"><SubmitButton text="Optimize"/></button>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    <div className="text-lg text-white text-center">Right click and press download:</div>
                    <div className="flex justify-center pt-8">
                        
                        <img src={cloudinaryRes} alt="Optimized" className="rounded-lg" width="500" />

                    </div>
                </>
            )}
        </>
    );
}

export default Form;
