import { Link } from "react-router-dom";
import discord from "../assets/Icons.png";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="h-[188px] w-full bg-[#363970] flex flex-col items-stretch justify-between px-2 sm:px-5 text-white">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between mt-10">
        <div>GetFoz</div>
        <div className="flex justify-between w-full sm:w-8/12 text-xs md:text-lg">
          <Link to="/tos">TOS</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/refund">Refund Policy</Link>

          <a
            href="https://twitter.com/getfoztrading"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaTwitter style={{ color: "white" }} size={20} />
            Join Twitter
          </a>

          <a
            href="https://discord.gg/85r3R9cj3Q"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img className="sm:w-7 mr-2" src={discord} alt="Discord Logo" />
            Join Discord
          </a>
        </div>
      </div>

      <div className="h-[30px] text-xs sm:text-sm px-5 border-r-[1px] border-l-[1px] mx-auto mb-5">
        <p className="text-center pt-1">
          Copyright ( GetFoz ) All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
