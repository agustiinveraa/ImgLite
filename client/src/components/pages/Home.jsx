import Form from "../layout/Form";
import FlipWords from "../ui/FlipWords";
import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"
import { HeroCard } from "../ui/HeroCard";

function Home() {
    const words = ["fastest", "most efficient", "completly free"];
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex items-center justify-center gap-20">
                    <div className="text-4xl font-normal text-neutral-400">
                        The
                        <FlipWords words={words} /> <br />
                        image optimizer on the web{" "}
                        <EmojiProvider data={emojiData}>
                        <Emoji name="rocket" width={40} style={{ display: "inline" }} />
                        </EmojiProvider>
                    </div>
                    <HeroCard/>
                </div>
                <div className="w-full max-w-4xl mx-auto min-h-96 rounded-lg mb-20">
                    <div className="flex flex-col justify-center text-center gap-4">
                        <div id="form" className="text-5xl font-bold text-center">Optimize your image here:</div>
                        <div className="text-lg">Optimize and compress your images effortlessly to boost performance. Completely free!</div>
                    </div>
                    <br />
                    <Form />
                </div>
            </div>
        </>
    )
}

export default Home