import React from "react";
import {
  CheckCircle,
  MapPin,
  Trash2,
  Calendar,
  CreditCard,
  FileCheck,
} from "lucide-react";

const steps = [
  { id: "postcode", label: "Postcode", icon: MapPin },
  { id: "waste-type", label: "Waste Type", icon: Trash2 },
  { id: "select-skip", label: "Select Skip", icon: CheckCircle, current: true },
  { id: "permit-check", label: "Permit Check", icon: FileCheck },
  { id: "choose-date", label: "Choose Date", icon: Calendar },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const ProgressIndicator: React.FC = () => {
  const currentIndex = steps.findIndex((s) => s.current);

  return (
    <div className="w-full px-4 sm:px-6 mb-6 sm:mb-8">
      {/* Mobile: Icons only with "--" between */}
      <div className="flex sm:hidden items-center justify-center flex-wrap gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < currentIndex;
          const isCurrent = step.current;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isComplete
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isCurrent
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-600 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>
              {/* Show line between icons except after the last one */}
              {index < steps.length - 1 && (
                <div
                  className={`w-4 h-0.5 ${
                    index < currentIndex ? "bg-blue-500" : "bg-gray-600"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Desktop: Full step list */}
      <div className="hidden sm:flex items-center justify-center flex-wrap gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isComplete = index < currentIndex;
          const isCurrent = step.current;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isComplete
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isCurrent
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-600 text-gray-500"
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isComplete || isCurrent ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-2 ${
                    isComplete ? "bg-blue-500" : "bg-gray-600"
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
