
import React from 'react';
import { CheckCircle, MapPin, Trash2, Calendar, CreditCard, FileCheck } from 'lucide-react';

const steps = [
  { id: 'postcode', label: 'Postcode', icon: MapPin },
  { id: 'waste-type', label: 'Waste Type', icon: Trash2 },
  { id: 'select-skip', label: 'Select Skip', icon: CheckCircle, current: true },
  { id: 'permit-check', label: 'Permit Check', icon: FileCheck },
  { id: 'choose-date', label: 'Choose Date', icon: Calendar },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

const ProgressIndicator: React.FC = () => {
  return (
    <div className="mb-6 sm:mb-8 w-full">
      {/* Mobile: Stack vertically */}
      <div className="block sm:hidden space-y-3 px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < 2;
          const isCurrent = step.current;
          
          return (
            <div key={step.id} className="flex items-center space-x-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 flex-shrink-0 ${
                  isComplete
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isCurrent
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-gray-600 text-gray-500'
                }`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`text-sm font-medium ${
                  isComplete || isCurrent ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px ml-4 ${
                    isComplete ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden sm:flex items-center justify-center space-x-4 lg:space-x-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < 2;
          const isCurrent = step.current;
          
          return (
            <div key={step.id} className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isComplete
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isCurrent
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-gray-600 text-gray-500'
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isComplete || isCurrent ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-4 ${
                    isComplete ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
