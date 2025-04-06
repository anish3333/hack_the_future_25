
import { cn } from "@/lib/utils";

interface KeywordMatchProps {
  keyword: string;
  inResume: boolean;
  importance: "high" | "medium" | "low";
  className?: string;
}

export function KeywordMatch({ keyword, inResume, importance, className }: KeywordMatchProps) {
  const getImportanceClass = () => {
    switch (importance) {
      case "high":
        return inResume ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
      case "medium":
        return inResume ? "border-blue-500 bg-blue-50" : "border-amber-500 bg-amber-50";
      case "low":
        return inResume ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50";
    }
  };

  const getImportanceIcon = () => {
    switch (importance) {
      case "high":
        return "⭐⭐⭐";
      case "medium":
        return "⭐⭐";
      case "low":
        return "⭐";
    }
  };

  return (
    <div 
      className={cn(
        "px-3 py-2 rounded-md border text-sm flex items-center justify-between gap-2",
        getImportanceClass(),
        className
      )}
    >
      <span>{keyword}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs">{getImportanceIcon()}</span>
        {inResume ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Found
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            Missing
          </span>
        )}
      </div>
    </div>
  );
}
