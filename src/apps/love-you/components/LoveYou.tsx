import React, { useState } from "react";

const LoveYou: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] font-sans text-white">
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer rounded-[25px] border-none bg-[#ff6f61] px-8 py-4 text-xl text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-105 hover:bg-[#ff3b2d] hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)] active:scale-95"
      >
        Click Me!
      </button>
      <h1
        className={`mt-5 text-5xl text-white transition-opacity duration-500 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
      >
        I love you ❤️
      </h1>
    </div>
  );
};

export default LoveYou;
