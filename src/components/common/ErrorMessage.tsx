import { AlertTriangle, RefreshCw } from "lucide-react";

type Props = {
  heading: string;
  description: string;
  retry?: () => void;
};
const ErrorMessage = ({ heading, description, retry }: Props) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-500 mb-4">
          <AlertTriangle size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{heading}</h3>
        <p className="text-gray-400">{description}</p>
        {retry && (
          <button
            onClick={retry}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
