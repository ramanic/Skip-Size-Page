import { useEffect, useState } from "react";
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
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureBadge } from "./FeatureBadge";

const SelectedSkipBar = () => {
  const { selectedSkip, resetSelection } = useSkipStore();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const priceBeforeVat = selectedSkip?.price_before_vat || 0;
  const vatRate = selectedSkip?.vat || 0;
  const vatAmount = (priceBeforeVat * vatRate) / 100;
  const totalPrice = priceBeforeVat + vatAmount;

  const handleBack = () => {
    window.open("https://wewantwaste.co.uk/", "_blank");
  };

  const discard = () => {
    resetSelection();
  };

  const handleContinue = () => {
    window.open("https://wewantwaste.co.uk/checkout", "_blank");
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    }

    // Run once on mount
    handleResize();

    // Listen to resize event
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-xl shadow-2xl shadow-black/25 border-t border-gray-700/50">
      {/* Mobile toggle bar */}
      <div
        className="sm:hidden flex items-center justify-between px-4 py-2 cursor-pointer select-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        aria-controls="skipbar-content"
      >
        <div className="text-white font-bold truncate">
          {selectedSkip
            ? `${selectedSkip.size} Yard Skip Selected`
            : "No Skip Selected"}
        </div>

        <div className="text-blue-400">
          {isCollapsed ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      {/* Content: collapsible on mobile */}
      {(!isCollapsed || window.innerWidth >= 640) && (
        <div
          id="skipbar-content"
          className="max-w-7xl mx-auto px-4 py-6 space-y-2 sm:block"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 flex-wrap">
            {/* Left side: Title or Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 flex-1 min-w-0">
              {!selectedSkip ? (
                <div className="text-white">
                  <h4 className="text-lg sm:text-xl font-bold">
                    Please select a skip to continue
                  </h4>
                </div>
              ) : (
                <div className="flex flex-row  sm:items-center gap-2 flex-1 min-w-0">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/25 whitespace-nowrap w-fit">
                    {selectedSkip.size} Yard Skip
                  </div>

                  <div className="text-white flex  flex-row items-center gap-2 flex-wrap text-xl sm:text-2xl font-bold">
                    <span>£{totalPrice.toFixed(2)}</span>
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
              )}
            </div>

            {/* Metadata badges */}
            {selectedSkip && (
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-2xl px-3 py-2 text-sm text-gray-300 backdrop-blur-sm">
                  <Calendar size={14} className="text-blue-400" />
                  <span>{selectedSkip.hire_period_days} day hire</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-2xl px-3 py-2 text-sm text-gray-300 backdrop-blur-sm">
                  <MapPin size={14} className="text-blue-400" />
                  <span>
                    {[selectedSkip.area, selectedSkip.postcode]
                      .filter(Boolean)
                      .join(", ")}
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
            )}
          </div>

          {/* Price Breakdown */}
          {selectedSkip && showPriceBreakdown && (
            <div className="bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50 animate-fadeIn">
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
          <p className="text-gray-400 text-xs sm:text-base pb-1">
            Imagery and information shown throughout this website may not
            reflect the exact shape or size specification, colours may vary,
            options and/or accessories may be featured at additional cost.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-row justify-between gap-3 pt-3 border-t border-gray-700/50">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-sm sm:text-base text-gray-400 hover:text-gray-200 hover:scale-105 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex flex-row gap-3">
              <Button
                disabled={!selectedSkip}
                onClick={discard}
                className="flex items-center gap-2 rounded-2xl border border-gray-700 px-4 py-2 text-sm sm:text-base text-gray-400 hover:text-red-400 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              >
                <Trash2 size={16} className="shrink-0" />
                Discard
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedSkip}
                className={`
                text-sm sm:text-base py-3 px-6 sm:px-8 rounded-xl transition-all duration-200 w-full sm:w-auto
                ${
                  !selectedSkip
                    ? "opacity-60 cursor-not-allowed bg-gray-700 text-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02]"
                }
              `}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedSkipBar;
