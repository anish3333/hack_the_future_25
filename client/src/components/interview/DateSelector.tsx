
import { Calendar } from "lucide-react";

interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export default function DateSelector({
  dates,
  selectedDate,
  setSelectedDate
}: DateSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dates.map((date) => (
          <div
            key={date}
            className={`p-4 rounded-lg border text-center cursor-pointer ${
              date === selectedDate
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-200"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <Calendar className={`h-5 w-5 mx-auto mb-2 ${date === selectedDate ? "text-indigo-600" : "text-gray-400"}`} />
            <p className={`font-medium ${date === selectedDate ? "text-indigo-700" : "text-gray-900"}`}>{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
