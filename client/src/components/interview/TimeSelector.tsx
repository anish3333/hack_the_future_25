
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  times: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function TimeSelector({
  times,
  selectedTime,
  setSelectedTime
}: TimeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {times.map((time) => (
          <div
            key={time}
            className={`p-3 rounded-lg border text-center cursor-pointer ${
              time === selectedTime
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-200"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            <Clock className={`h-4 w-4 mx-auto mb-1 ${time === selectedTime ? "text-indigo-600" : "text-gray-400"}`} />
            <p className={`text-sm font-medium ${time === selectedTime ? "text-indigo-700" : "text-gray-900"}`}>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
