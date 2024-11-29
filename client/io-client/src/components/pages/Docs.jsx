import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"
import DocsImg from "../../assets/docs1.png"

function Docs() {
    return (
        <>
            <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col gap-8">
                    <div className="text-4xl font-semibold">How to use ImgLite</div>
                    <div className="w-full max-w-4xl mx-auto min-h-96 rounded-lg mb-20">
                        <div className="flex flex-col gap-4">
                            <div className="text-2xl font-semibold">1. Choose quality (0-100)</div>
                            <div className="text-lg">30-40 recommended</div>
                            <div className="text-2xl font-semibold">2. Select image format</div>
                            <div className="text-lg">Choose between PNG, JPEG, WEBP or AVIF</div>
                            <div className="text-2xl font-semibold">3. Upload image</div>
                            <div className="text-lg">Drag and drop or click to select</div>
                            <div className="text-2xl font-semibold">4. Click on optimize</div>
                            <div className="text-lg">Wait a few seconds for optimizing, compressing, and converting the image</div>
                            <div className="text-2xl font-semibold">5. Download</div>
                            <div className="text-lg">Click the download button to get your optimized image</div>
                            <div className="text-2xl font-semibold">6. Done!</div>
                            <div className="text-lg flex gap-2 items-center">
                                Thanks for using ImgLite
                                <EmojiProvider data={emojiData}>
                                    <Emoji name="red-heart" width={25} style={{ display: "inline" }} />
                                </EmojiProvider>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={DocsImg} alt="Docs" />
            </div>
        </>
    );
}

export default Docs;