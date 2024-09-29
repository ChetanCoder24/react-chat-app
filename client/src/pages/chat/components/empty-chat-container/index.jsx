import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-slate-800 md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
    <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
    />
    <div className="text-white text-opacity-80 flex flex-col items-center gap-5 mt-10  transition-all duration-300 text-center">
    <h3 className="poppins-medium text-3xl lg:text-4xl">
        Hi<span className="text-purple-500">!</span>Welcome to <span className="text-purple-500">Syncronus</span> Chat app<span className="text-purple-500">.</span>
    </h3>
    </div>
    </div>
  )
}

export default EmptyChatContainer;