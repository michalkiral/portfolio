import React, { useState } from "react";

const LoveYou: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4]">
      <button
        type="button"
        onClick={() => setShowMessage(true)}
        className="rounded-full bg-[#ff6f61] px-10 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#ff3b2d] hover:shadow-xl active:scale-95"
      >
        Click Me!
      </button>
      <p
        className={`mt-8 text-5xl font-bold text-white drop-shadow transition-opacity duration-500 ${showMessage ? "opacity-100" : "opacity-0"}`}
      >
        I love you ❤️
      </p>
    </div>
  );
};

export default LoveYou;
