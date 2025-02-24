import { Link } from "react-router-dom";
import GhButton from "../ui/GhButton";
import { DocsIcon } from "../icons/DocsIcon";
import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm text-white py-2 px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="flex gap-4 md:gap-6 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <EmojiProvider data={emojiData}>
            <Emoji name="high-voltage" width={25} style={{ display: "inline" }} />
          </EmojiProvider>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Img<span className="text-blue-400">Lite</span>
          </h1>
        </Link>
        <Link
          to="/docs"
          className="flex gap-1 px-2 items-center justify-center bg-white bg-opacity-30 rounded-lg transition-all duration-300 ease-in-out hover:bg-transparent hover:border hover:border-neutral-500 hover:backdrop-blur-lg hover:transition-all text-sm md:text-base"
        >
          Docs
          <DocsIcon className="inline-block ml-1" />
        </Link>
      </div>

      <ul className="flex p-2 md:p-4 gap-10 text-base">
        <li>
          <Link to="https://github.com/agustiinveraa/img-optimizer">
            <GhButton />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;