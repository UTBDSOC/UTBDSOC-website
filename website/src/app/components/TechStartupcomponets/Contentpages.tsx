import React from 'react';
import Image from 'next/image';

interface ContentPagesProps {
  label: string;
  stepNumber: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  extraText?: string;
  reverse?: boolean;
}

const ContentPages: React.FC<ContentPagesProps> = ({
  label,
  stepNumber,
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  extraText,
  reverse = false,
}) => {
  return (
    <section>
      <div
        className={`mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ${
          reverse ? 'lg:flex-row-reverse' : ''
        } flex flex-col lg:flex-row items-center`}
        style={{ backgroundColor: '#FFF7F3' }} // Light beige background color
      >
        <div className="max-w-3xl lg:w-1/2">
          <h3 className="text-lg font-semibold" style={{ color: '#AB6456' }}>
            {label}
          </h3>
          <h2
            className="text-4xl font-bold mt-2"
            style={{ color: '#AB6456' }} // Deep reddish-brown color for title
          >
            {`${stepNumber}: ${title}`}
          </h2>
          <p className="mt-4" style={{ color: '#AB6456' }}>
            {description}
          </p>
          {extraText && <p className="mt-2" style={{ color: '#AB6456' }}>{extraText}</p>}
          <a
            href={buttonLink}
            className="inline-block mt-6 px-5 py-3 rounded"
            style={{
              backgroundColor: '#AB6456',
              color: '#FFF7F3', // Button with reddish-brown background and light beige text
              fontWeight: 'medium',
            }}
          >
            {buttonText}
          </a>
        </div>
        <div className="relative h-64 w-full mt-8 overflow-hidden sm:h-80 lg:h-full lg:w-1/2 lg:mt-0">
          <Image
            alt={title}
            src={imageUrl}
            layout="fill" // Ensures the image covers the container
            objectFit="cover" // Makes the image behave like `object-cover`
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ContentPages;
