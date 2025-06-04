const SkipPlaceholder = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div className="animate-pulse rounded-xl bg-gray-800 h-96" />
    ))}
  </>
);

export default SkipPlaceholder;
