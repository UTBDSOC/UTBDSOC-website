import React from "react";

interface CardProps {
  imageSrc: string;
  title: React.ReactNode;
  description: React.ReactNode;
  linkText: string;
  linkUrl: string;
}

export const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  linkText,
  linkUrl,
}) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <img
        alt="Card"
        src={imageSrc}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <a href={linkUrl}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        </a>
        <div className="mt-2 text-sm text-gray-600 leading-relaxed">
          {description}
        </div>
        <a
          href={linkUrl}
          className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800"
        >
          {linkText} &rarr;
        </a>
      </div>
    </article>
  );
};
