
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ScheduleButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export default function ScheduleButton({ isLoading, onClick }: ScheduleButtonProps) {
  return (
    <div className="pt-4">
      <Button 
        className="w-full" 
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Scheduling...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-5 w-5" /> Send Interview Invite
          </>
        )}
      </Button>
    </div>
  );
}
