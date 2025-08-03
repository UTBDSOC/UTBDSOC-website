'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface Service {
  name: string;
  link: string;
}

interface ServiceNavigationProps {
  previousService: Service;
  nextService: Service;
}

const ServiceNavigation = ({
  previousService,
  nextService,
}: ServiceNavigationProps) => {
  const renderButton = (
    service: Service,
    isPrevious: boolean
  ) => (
    <Link href={service.link}>
      <button className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white active:bg-gray-700">
        <span className="rounded-full bg-gray-800 p-2 text-white transition-colors duration-300 hover:bg-white hover:text-gray-800">
          {isPrevious ? (
            <FiArrowLeft className="text-lg" />
          ) : (
            <FiArrowRight className="text-lg" />
          )}
        </span>
        <span>{service.name}</span>
      </button>
    </Link>
  );

  return (
    <div className="flex flex-wrap justify-between items-center py-8 gap-4">
      {renderButton(previousService, true)}
      {renderButton(nextService, false)}
    </div>
  );
};

export default ServiceNavigation;
