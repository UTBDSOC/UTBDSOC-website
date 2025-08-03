import React from "react";

interface BannerProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonAction: () => void;
  secondaryButtonText: string;
  secondaryButtonAction: () => void;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  return (
    <div className="bg-green-900 text-white pt-32 md:pt-60 pb-16 md:pb-32 px-4 md:px-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8">{title}</h1>
      <p className="text-lg md:text-2xl mb-6 md:mb-12">{description}</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <button
          onClick={primaryButtonAction}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 md:py-4 md:px-12 rounded text-base md:text-xl"
        >
          {primaryButtonText}
        </button>
        <button
          onClick={secondaryButtonAction}
          className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 md:py-4 md:px-12 rounded text-base md:text-xl"
        >
          {secondaryButtonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
