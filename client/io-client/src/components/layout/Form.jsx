import { useState } from "react";
import axios from "axios";
import { FileUpload } from "../ui/FileUpload";
import SubmitButton from "../ui/SubmitButton";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';

function Form() {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(100);
    const [format, setFormat] = useState('webp');
    const [files, setFiles] = useState([]);
    
    const handleFileUpload = (files) => {
        setFiles(files);
        setFile(files[0]); // Assuming you want to use the first file
        console.log(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file, quality, format);

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
            
            // alertify.success('Image optimized successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg p-10">
                    <div className="flex justify-center gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="quality" className="text-lg p-2">Choose quality (0-100): </label>
                            <input
                                className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                                type="number"
                                placeholder="(0-100)"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                                min="0"
                                max="100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="format" className="text-lg p-2">Choose format: </label>
                            <select className="bg-[#222630] px-4 py-3 min-h-[52px] outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" value={format} onChange={(e) => setFormat(e.target.value)}>
                                <option value="webp">WEBP</option>
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="avif">AVIF</option>
                            </select>
                        </div>
                    </div>
                <br />
                <FileUpload onChange={handleFileUpload} />
                <div className="flex justify-center pt-8">
                    <button type="submit"><SubmitButton /></button>
                </div>
            </div>
            
        </form>
    );
}

export default Form;
