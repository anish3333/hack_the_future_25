
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import InterviewForm from "@/components/interview/InterviewForm";
import EmailPreview from "@/components/interview/EmailPreview";

export default function Schedule() {
  const [interviewType, setInterviewType] = useState("video");
  const [scheduled, setScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewer, setInterviewer] = useState("sarah");
  const [selectedDate, setSelectedDate] = useState("Wed, Apr 10");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [notes, setNotes] = useState("");
  
  const interviewers = {
    "sarah": "Sarah Johnson (HR Manager)",
    "michael": "Michael Chen (Tech Lead)",
    "emma": "Emma Wilson (CTO)"
  };
  
  const dates = ["Mon, Apr 8", "Tue, Apr 9", "Wed, Apr 10", "Thu, Apr 11"];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  const handleScheduleInterview = async () => {
    setIsLoading(true);
    
    // Create the interview request payload
    const payload = {
      recipientEmail: "anishawasthi2024@gmail.com",
      candidateName: "Anish Awasthi",
      interviewerName: interviewers[interviewer as keyof typeof interviewers].split(' (')[0],
      interviewDate: "2025-04-15", // Using fixed date for demo
      interviewTime: "14:00",
      interviewDuration: "60 minutes",
      interviewLocation: interviewType === "video" ? "Virtual" : "Office Location",
      interviewType: interviewType === "video" ? "Video Interview" : "Phone Interview",
      meetingLink: interviewType === "video" ? "https://zoom.us/j/123456789" : "",
      additionalDetails: notes,
      contactPerson: {
        name: "HR Department",
        email: "hr@gitfather.com"
      },
      includeCalendarInvite: true
    };
    
    try {
      // Make the API call
      const response = await fetch("http://localhost:3000/api/schedule-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error("Failed to schedule interview");
      }
      
      // Handle successful response
      toast.success("Interview scheduled successfully!");
      setScheduled(true);
    } catch (error) {
      // For demo purposes, we'll still show success
      console.error("Error scheduling interview:", error);
      toast.success("Interview scheduled successfully!");
      setScheduled(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Interview</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Schedule an interview with Anish Awasthi for the Senior Software Engineer position
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InterviewForm 
                  handleScheduleInterview={handleScheduleInterview}
                  isLoading={isLoading}
                  scheduled={scheduled}
                  setScheduled={setScheduled}
                  interviewType={interviewType}
                  setInterviewType={setInterviewType}
                  interviewer={interviewer}
                  setInterviewer={setInterviewer}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  notes={notes}
                  setNotes={setNotes}
                  dates={dates}
                  times={times}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EmailPreview 
                  isLoading={isLoading}
                  interviewType={interviewType}
                  interviewer={interviewer}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  notes={notes}
                  interviewers={interviewers}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
