
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface SuccessStateProps {
  interviewType: string;
  selectedDate: string;
  selectedTime: string;
  onReschedule: () => void;
}

export default function SuccessState({
  interviewType,
  selectedDate,
  selectedTime,
  onReschedule
}: SuccessStateProps) {
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Interview Scheduled!</h3>
      <p className="text-gray-600 text-center mb-4">
        You have successfully scheduled a {interviewType} interview with Anish Awasthi for {selectedDate} at {selectedTime}.
      </p>
      <div className="flex space-x-4">
        <Link to="/group-discussion">
          <Button>Continue to Group Discussion</Button>
        </Link>
        <Button variant="outline" onClick={onReschedule}>
          Reschedule
        </Button>
      </div>
    </div>
  );
}
