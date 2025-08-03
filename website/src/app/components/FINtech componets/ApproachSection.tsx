import React, { useState } from "react";

interface Step {
  step: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface TabsProps {
  steps: Step[];
}

const ApproachSection: React.FC<TabsProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-gray-50 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Approach</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Our primary goal is to ensure your people's time invested in learning
          is well spent. We follow a structured process to deliver innovative
          learning solutions aligned with your strategic goals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 border-b border-gray-200">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`pb-2 text-sm font-medium ${
              activeStep === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {step.step}
          </button>
        ))}
      </div>

      {/* Content */}
      <StepContent step={steps[activeStep]} />
    </section>
  );
};

interface StepContentProps {
  step: Step;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
      <div className="flex justify-center">
        <img
          src={step.imageSrc}
          alt={step.title}
          className="rounded-lg shadow-md w-full max-w-md"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default ApproachSection;
