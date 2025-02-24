import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";
import DocsImg from "../../assets/docs.png";

function Docs() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-8 align-middle my-20">
        <div className="flex flex-col gap-8 w-full md:w-auto">
          <div className="text-3xl md:text-4xl font-semibold text-center md:text-left">
            How to use ImgLite
          </div>
          <div className="w-full max-w-4xl mx-auto min-h-96 rounded-lg mb-20">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-semibold">
                1. Choose quality (0-100)
              </div>
              <div className="text-lg">30-40 recommended</div>
              <div className="text-2xl font-semibold">
                2. Select image format
              </div>
              <div className="text-lg">
                Choose between PNG, JPEG, WEBP or AVIF
              </div>
              <div className="text-2xl font-semibold">3. Upload image</div>
              <div className="text-lg">Drag and drop or click to select</div>
              <div className="text-2xl font-semibold">4. Click on optimize</div>
              <div className="text-lg">
                Wait a few seconds for optimizing, compressing, and converting
                the image
              </div>
              <div className="text-2xl font-semibold">5. Download</div>
              <div className="text-lg">
                You will see your image on the screen already optimized,
                <br></br>you will simply have to right click on it and download
                it.
              </div>
              <div className="text-2xl font-semibold">6. Done!</div>
              <div className="text-lg flex gap-2 items-center">
                Thanks for using ImgLite
                <EmojiProvider data={emojiData}>
                  <Emoji
                    name="red-heart"
                    width={25}
                    style={{ display: "inline" }}
                  />
                </EmojiProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="p-12">
          <img
            src={DocsImg}
            alt="Docs"
            className="hidden md:block rounded-xl  max-w-[700px] shadow-md"
          />
        </div>
      </div>
    </>
  );
}

export default Docs;
