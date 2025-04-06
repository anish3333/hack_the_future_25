
import { Textarea } from "@/components/ui/textarea";

interface AdditionalNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export default function AdditionalNotes({
  notes,
  setNotes
}: AdditionalNotesProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
      <Textarea 
        rows={3} 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Add any specific topics or questions you'd like to discuss..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}
