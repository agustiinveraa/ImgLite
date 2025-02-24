import { useState } from "react";
import axios from "axios";
import SubmitButton from "../ui/SubmitButton";
import alertify from "alertifyjs";

function Form() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(100);
  const [format, setFormat] = useState("webp");
  const [optimized, setOptimized] = useState(false);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (selectedFile && selectedFile.size > maxSize) {
      setError("File size must be less than 10MB");
      e.target.value = null;
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", file);
    formData.append("quality", quality);
    formData.append("format", format);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/optimize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const imageInfo = response.data[0];
        const filename = `${imageInfo.originalName.split(".")[0]}.${
          imageInfo.format
        }`;
        setOptimizedImage(filename);
        setOptimized(true);
      } else {
        alertify.error("Error optimizing image. Please try again.");
      }
    } catch (error) {
      alertify.error("Error optimizing image. Please try again.");
      console.error("Error:", error);
      setOptimized(false);
    }
  };
  return (
    <>
      {!optimized ? (
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-gray-900 border-gray-700 rounded-lg p-10">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="flex flex-col">
                <label htmlFor="quality" className="text-lg p-2 text-white">
                  Choose quality (0-100):{" "}
                </label>
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
                <label htmlFor="format" className="text-lg p-2 text-white">
                  Choose format:{" "}
                </label>
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
            <div className="flex flex-col items-center gap-2">
              <div className="flex justify-center w-full max-w-xs items-center gap-1.5 mx-auto pt-5">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="flex h-10 w-full rounded-md border border-input bg-gray-800 px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-400 file:text-sm file:font-medium"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
            <br />
            <div className="flex justify-center pt-8">
              <button type="submit">
                <SubmitButton />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-center pt-8">
            <div className="text-lg text-white">Download your image:</div>
          </div>
          <div className="flex justify-center pt-8">
            <img
              src={`https://res.cloudinary.com/de9i16iit/image/upload/optimized_images/${optimizedImage}`}
              alt="optimized"
              className="rounded-lg"
              width="300"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Form;
