import { cn } from "@/lib/utils";

type FeatureBadgeProps = {
  isActive: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  activeText: string;
  inactiveText: string;
};

export const FeatureBadge = ({
  isActive,
  activeIcon,
  inactiveIcon,
  activeText,
  inactiveText,
}: FeatureBadgeProps) => (
  <div
    className={cn(
      "flex items-center gap-2 text-sm  px-3 py-2 backdrop-blur-sm rounded-2xl",
      isActive
        ? "bg-emerald-500/10 border border-emerald-500/20"
        : "bg-red-500/10 border border-red-500/20"
    )}
  >
    {isActive ? activeIcon : inactiveIcon}
    <span
      className={cn(
        "font-medium",
        isActive ? "text-emerald-400" : "text-red-400"
      )}
    >
      {isActive ? activeText : inactiveText}
    </span>
  </div>
);
