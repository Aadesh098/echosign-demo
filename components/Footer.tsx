import { FaLocationArrow } from "react-icons/fa6";
import { EarthCanvas } from "./canvas";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>
      <EarthCanvas />
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to <span className="text-purple">Collaborate</span> on Impactful Digital Solutions?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Please do reach out if we could serve you in any way possible
        </p>
        <a href="mailto:aadesh0313@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="mb-2 md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 EchoSign
        </p>

        <div className="mt-1 mb-2 flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a key={info.id} href={info.link} target="_blank">
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;