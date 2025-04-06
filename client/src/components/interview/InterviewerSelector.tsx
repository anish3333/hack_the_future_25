
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface InterviewerSelectorProps {
  interviewer: string;
  setInterviewer: (interviewer: string) => void;
}

export default function InterviewerSelector({ 
  interviewer, 
  setInterviewer 
}: InterviewerSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer</label>
      <Select 
        defaultValue={interviewer} 
        onValueChange={value => setInterviewer(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select interviewer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sarah">Sarah Johnson (HR Manager)</SelectItem>
          <SelectItem value="michael">Michael Chen (Tech Lead)</SelectItem>
          <SelectItem value="emma">Emma Wilson (CTO)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
