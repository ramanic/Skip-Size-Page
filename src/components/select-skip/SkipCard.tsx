import React from "react";
import { Skip } from "../../stores/skipStore";
import { useSkipStore } from "../../stores/skipStore";
import { CheckCircle, X, Calendar, Truck, Weight } from "lucide-react";

interface SkipCardProps {
  skip: Skip;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip }) => {
  const { selectedSkip, setSelectedSkip } = useSkipStore();
  const isSelected = selectedSkip?.id === skip.id;

  const totalPrice =
    skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;
  const vatAmount = (skip.price_before_vat * skip.vat) / 100;

  const handleSelect = () => {
    setSelectedSkip(skip);
  };

  const getSkipImageUrl = (size: number) =>
    `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const fallback = target.parentElement?.querySelector(
      ".fallback-container"
    ) as HTMLElement;
    if (fallback) {
      target.style.display = "none";
      fallback.style.display = "flex";
    }
  };

  return (
    <div
      className={`group relative bg-gradient-to-b from-gray-700 to-gray-950 rounded-2xl border-2 overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer flex flex-col will-change-transform ${
        isSelected
          ? "border-blue-500 shadow-blue-500/30 ring-2 ring-blue-500/20"
          : "border-gray-700 hover:border-gray-600"
      }`}
      onClick={handleSelect}
      style={{
        transform: "translateZ(0)", // Force hardware acceleration
        backfaceVisibility: "hidden", // Prevent flickering
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 bg-blue-500 rounded-full p-2 shadow-lg">
          <CheckCircle size={20} className="text-white" />
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-t-2xl">
        <img
          src={getSkipImageUrl(skip.size)}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />

        {/* Fallback container */}
        <div className="fallback-container absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center text-gray-400">
            <Truck size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">{skip.size} Yard Skip</p>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Feature badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 z-10">
          <div
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm transition-all ${
              skip.allowed_on_road
                ? "bg-emerald-500/90 text-white shadow-emerald-500/25"
                : "bg-red-500/90 text-white shadow-amber-500/25"
            }`}
          >
            {skip.allowed_on_road ? <CheckCircle size={15} /> : <X size={15} />}
            On Road
          </div>
          <div
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm transition-all ${
              skip.allows_heavy_waste
                ? "bg-emerald-500/90 text-white shadow-emerald-500/25"
                : "bg-red-500/90 text-white shadow-amber-500/25"
            }`}
          >
            {skip.allows_heavy_waste ? (
              <CheckCircle size={15} />
            ) : (
              <X size={15} />
            )}
            Heavy
          </div>
        </div>
      </div>

      {/* Header with size and price */}
      <div className="px-6 py-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {skip.size} Yard Skip
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              £{totalPrice.toFixed(0)}
            </div>
            <div className="text-xs text-gray-400">
              inc. £{vatAmount.toFixed(0)} VAT
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 py-4 flex-grow space-y-4">
        {/* Hire duration */}
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar size={16} className="text-blue-400" />
          <span className="text-sm">
            <span className="font-semibold">{skip.hire_period_days} days</span>{" "}
            hire period
          </span>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              isSelected
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white group-hover:shadow-md"
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle size={16} />
                Selected
              </>
            ) : (
              <>
                Select This Skip
                <span className="text-lg transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
