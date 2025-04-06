
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ATSScoreIndicatorProps {
  score: number;
  className?: string;
}

export function ATSScoreIndicator({ score, className }: ATSScoreIndicatorProps) {
  const getColorClass = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const getScoreText = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">ATS Score</span>
        <span className="text-sm font-medium">{score}%</span>
      </div>
      <Progress value={score} className="h-2">
        <div className={cn("h-full", getColorClass())} style={{ width: `${score}%` }} />
      </Progress>
      <div className="text-right text-xs text-muted-foreground">{getScoreText()}</div>
    </div>
  );
}
