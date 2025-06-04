import React from "react";
import SkipContainer from "../components/select-skip/SkipContainer";
import ProgressIndicator from "@/components/layout/ProgressIndicator";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProgressIndicator />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <SkipContainer />
      </div>
    </div>
  );
};

export default Index;
