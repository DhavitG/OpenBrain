import { useNavigate } from "react-router-dom";
import LogoIcon from "../icons/LogoIcon";
import Button from "./Button";
import heroImage from "../assets/heroImage.jpg";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="absolute inset-0 -z-10 opacity-25">
        <img src={heroImage} className="w-full h-full object-cover" />
      </div>
      {/* Logo + Brand Row */}
      <div className="flex justify-center items-center pt-30 pr-4">
        <div className="flex justify-center items-center p-3 rounded-2xl w-21 h-21 bg-purple-300">
          <LogoIcon />
        </div>
        <h1 className="pl-2 font-bold text-3xl">OpenBrain</h1>
      </div>

      {/* Hero Heading */}
      <h2 className="mt-10 text-7xl font-bold text-center leading-tight">
        Your Digital
        <span className="block text-center text-purple-600 pl-1">
          Second Brain
        </span>
      </h2>

      <p className="text-center max-w-3xl mt-8 text-xl text-purple-600 leading-relaxed">
        Capture, organize, and connect everything that matters. From YouTube
        videos to tweets, documents to audio notes, all in one intelligent
        workspace.
      </p>

      <div className="flex mt-14 gap-8">
        <Button
          variant="primary"
          text="Start Building Your Brain ->"
          onClick={() => {
            navigate("/signup");
          }}
          size="md"
          className="hover:opacity-80"
        />
        <Button
          variant="secondary"
          text="Why OpenBrain?"
          onClick={() => {}}
          size="md"
          className="hover:bg-purple-700/75 hover:text-white duration-200"
        />
      </div>
    </div>
  );
}

export default Hero;
