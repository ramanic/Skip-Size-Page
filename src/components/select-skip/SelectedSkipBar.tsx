import { useState } from "react";
import { useSkipStore } from "@/stores/skipStore";
import {
  CheckCircle,
  X,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureBadge } from "./FeatureBadge";

const SelectedSkipBar = () => {
  const { selectedSkip } = useSkipStore();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const priceBeforeVat = selectedSkip?.price_before_vat || 0;
  const vatRate = selectedSkip?.vat || 0;
  const vatAmount = (priceBeforeVat * vatRate) / 100;
  const totalPrice = priceBeforeVat + vatAmount;

  const handleBack = () => {};
  const handleContinue = () => {
    console.log("Continuing with skip:", selectedSkip);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700/50 bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900/95 backdrop-blur-lg shadow-2xl shadow-black/25">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {!selectedSkip ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="text-white flex-1">
              <h2 className="text-lg sm:text-xl font-bold">
                Please select a skip to continue
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-2">
                Choose from the available options above to see pricing and
                details
              </p>
            </div>
            <div className="flex w-full sm:w-auto gap-3">
              <Button variant="ghost" className="text-sm sm:text-base">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                disabled
                className="w-full sm:w-auto text-sm sm:text-base opacity-60 cursor-not-allowed bg-gray-700 text-gray-500 font-bold px-6 py-3 sm:px-8 rounded-xl"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Main Info Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 flex-wrap">
              {/* Left */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/25 whitespace-nowrap w-fit">
                  {selectedSkip.size} Yard Skip
                </div>

                <div className="text-white flex items-center gap-2 flex-wrap text-xl sm:text-2xl font-bold">
                  <span>£{totalPrice.toFixed(2)}</span>
                  <span className="text-sm sm:text-base text-gray-400">
                    for {selectedSkip.hire_period_days} days
                  </span>
                  <button
                    onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                    className="text-blue-400 hover:text-blue-300 ml-1"
                    aria-label={
                      showPriceBreakdown
                        ? "Hide price breakdown"
                        : "Show price breakdown"
                    }
                  >
                    {showPriceBreakdown ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-2xl px-3 py-2 text-sm text-gray-300 backdrop-blur-sm">
                  <Calendar size={14} className="text-blue-400" />
                  <span>{selectedSkip.hire_period_days} day hire</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-2xl px-3 py-2 text-sm text-gray-300 backdrop-blur-sm">
                  <MapPin size={14} className="text-blue-400" />
                  <span>
                    {selectedSkip.area}, {selectedSkip.postcode}
                  </span>
                </div>

                <FeatureBadge
                  isActive={selectedSkip.allowed_on_road}
                  activeIcon={
                    <CheckCircle size={14} className="text-emerald-400" />
                  }
                  inactiveIcon={<X size={14} className="text-red-400" />}
                  activeText="Allowed on Road"
                  inactiveText="Not Allowed on Road"
                />

                <FeatureBadge
                  isActive={selectedSkip.allows_heavy_waste}
                  activeIcon={
                    <CheckCircle size={14} className="text-emerald-400" />
                  }
                  inactiveIcon={<X size={14} className="text-red-400" />}
                  activeText="Heavy Waste Allowed"
                  inactiveText="Heavy Waste Not Allowed"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            {showPriceBreakdown && (
              <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50 animate-fadeIn">
                <h4 className="text-white font-medium mb-2">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Base Price:</span>
                    <span className="text-white font-medium">
                      £{priceBeforeVat.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>VAT ({vatRate}%):</span>
                    <span className="text-white font-medium">
                      £{vatAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-medium text-gray-300">
                    <span>Total:</span>
                    <span className="text-white font-bold">
                      £{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t border-gray-700/50">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-sm sm:text-base text-gray-400 hover:text-gray-200 hover:scale-105 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-200 w-full sm:w-auto text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02]"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedSkipBar;
