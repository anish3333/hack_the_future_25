
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Mail, Phone, User, Video } from "lucide-react";

interface EmailPreviewProps {
  isLoading: boolean;
  interviewType: string;
  interviewer: string;
  selectedDate: string;
  selectedTime: string;
  notes: string;
  interviewers: Record<string, string>;
}

export default function EmailPreview({
  isLoading,
  interviewType,
  interviewer,
  selectedDate,
  selectedTime,
  notes,
  interviewers
}: EmailPreviewProps) {
  const getNextTime = (time: string) => {
    if (time === "9:00 AM") return "10:00 AM";
    if (time === "10:00 AM") return "11:00 AM";
    if (time === "11:00 AM") return "12:00 PM";
    if (time === "1:00 PM") return "2:00 PM";
    if (time === "2:00 PM") return "3:00 PM";
    return "4:00 PM";
  };

  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Interview Invitation</p>
                <p className="text-xs text-gray-500">noreply@hireflow.com</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white">
            <p className="text-gray-700 text-sm">Dear John Doe,</p>
            <p className="text-gray-700 text-sm mt-4">
              Thank you for your application for the Senior Software Engineer position at TechCorp.
              We would like to invite you to an interview to discuss your qualifications and experience in more detail.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-900">{selectedDate}, 2025</p>
                  <p className="text-gray-600">
                    {selectedTime} - {getNextTime(selectedTime)} (Eastern Time)
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-3">
                {interviewType === "video" ? (
                  <Video className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                ) : (
                  <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{interviewType === "video" ? "Google Meet" : "Phone Call"}</p>
                  {interviewType === "video" && <p className="text-indigo-600">meet.google.com/abc-defg-hij</p>}
                </div>
              </div>
              <div className="flex items-start mt-3">
                <User className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-900">Interviewer</p>
                  <p className="text-gray-600">{interviewers[interviewer as keyof typeof interviewers]}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 text-sm">
                Please confirm your availability by clicking the button below.
                If you have any questions or need to reschedule, please reply to this email.
              </p>
              {notes && (
                <p className="text-gray-700 text-sm mt-2">
                  <span className="font-medium">Additional information: </span>
                  {notes}
                </p>
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg">
                Confirm Attendance
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              We look forward to speaking with you!
            </p>
            <p className="text-gray-700 text-sm mt-4">
              Best regards,<br />
              The TechCorp Hiring Team
            </p>
          </div>
        </div>
      )}
    </>
  );
}
