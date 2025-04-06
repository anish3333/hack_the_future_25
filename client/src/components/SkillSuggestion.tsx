
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface SkillSuggestionProps {
  skill: string;
  reason: string;
  onAdd: (skill: string) => void;
}

export function SkillSuggestion({ skill, reason, onAdd }: SkillSuggestionProps) {
  return (
    <div className="p-3 border border-dashed border-indigo-300 rounded-md bg-indigo-50 flex justify-between items-center">
      <div>
        <p className="font-medium text-sm text-indigo-700">{skill}</p>
        <p className="text-xs text-indigo-600">{reason}</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100"
        onClick={() => onAdd(skill)}
      >
        <PlusCircle className="h-4 w-4 mr-1" />
        <span className="text-xs">Add</span>
      </Button>
    </div>
  );
}
