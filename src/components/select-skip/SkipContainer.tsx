import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSkipStore } from "../../stores/skipStore";
import { fetchSkipsByLocation } from "../../services/skipService";
import SkipCard from "./SkipCard";
import LoadingSpinner from "../common/LoadingSpinner";
import SelectedSkipBar from "./SelectedSkipBar";
import ErrorMessage from "../common/ErrorMessage";

const SkipContainer: React.FC = () => {
  const {
    data: skips = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["skips", "NR32", "Lowestoft"],
    queryFn: () => fetchSkipsByLocation("NR32", "Lowestoft"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error)
    return (
      <ErrorMessage
        heading="Unable to Load Skips"
        description={
          error instanceof Error
            ? error.message
            : "Please check your connection and try again."
        }
        retry={refetch}
      />
    );
  if (skips.length === 0)
    return (
      <ErrorMessage
        heading="No Skips Available"
        description="No skip options found for the selected location."
      />
    );

  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      <div className="text-center px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
          Choose Your Skip Size
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
        {skips.map((skip) => (
          <SkipCard key={skip.id} skip={skip} />
        ))}
      </div>

      <SelectedSkipBar />
    </div>
  );
};

export default SkipContainer;
