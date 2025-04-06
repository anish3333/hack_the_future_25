
import { Video, Phone } from "lucide-react";

interface InterviewTypeSelectorProps {
  interviewType: string;
  setInterviewType: (type: string) => void;
}

export default function InterviewTypeSelector({ 
  interviewType, 
  setInterviewType 
}: InterviewTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
      <div className="grid grid-cols-2 gap-4">
        <div 
          className={`p-4 rounded-lg border flex items-center cursor-pointer ${
            interviewType === "video" 
              ? "border-indigo-500 bg-indigo-50" 
              : "border-gray-200 hover:border-indigo-200"
          }`}
          onClick={() => setInterviewType("video")}
        >
          <Video className={`h-5 w-5 mr-3 ${interviewType === "video" ? "text-indigo-600" : "text-gray-400"}`} />
          <div>
            <p className={`font-medium ${interviewType === "video" ? "text-indigo-700" : "text-gray-900"}`}>
              Video Call
            </p>
            <p className="text-xs text-gray-500">Google Meet</p>
          </div>
        </div>
        <div 
          className={`p-4 rounded-lg border flex items-center cursor-pointer ${
            interviewType === "phone" 
              ? "border-indigo-500 bg-indigo-50" 
              : "border-gray-200 hover:border-indigo-200"
          }`}
          onClick={() => setInterviewType("phone")}
        >
          <Phone className={`h-5 w-5 mr-3 ${interviewType === "phone" ? "text-indigo-600" : "text-gray-400"}`} />
          <div>
            <p className={`font-medium ${interviewType === "phone" ? "text-indigo-700" : "text-gray-900"}`}>
              Phone Call
            </p>
            <p className="text-xs text-gray-500">Direct call</p>
          </div>
        </div>
      </div>
    </div>
  );
}
