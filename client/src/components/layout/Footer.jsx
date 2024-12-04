import { GhIcon } from "../icons/GhIcon";

function Footer() {
  return (
    <div className="flex flex-col w-full h-fit text-[#e5e7eb] px-14 pb-7">
        <div className="text-center">Built by <a href="https://instagram.com/agustiinveraa" className="underline hover:text-blue-200 mr-2">Agustin Vera</a>    •    <a href="https://github.com/agustiinveraa" className="underline hover:text-blue-200 mr-2"><GhIcon className="mx-2" style={{ display: "inline" }}/>GitHub</a></div>
    </div>
  );
}

export default Footer;