
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InterviewTypeSelector from "./InterviewTypeSelector";
import InterviewerSelector from "./InterviewerSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import AdditionalNotes from "./AdditionalNotes";
import ScheduleButton from "./ScheduleButton";
import SuccessState from "./SuccessState";

interface InterviewFormProps {
  handleScheduleInterview: () => Promise<void>;
  isLoading: boolean;
  scheduled: boolean;
  setScheduled: (scheduled: boolean) => void;
  interviewType: string;
  setInterviewType: (type: string) => void;
  interviewer: string;
  setInterviewer: (interviewer: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  dates: string[];
  times: string[];
}

export default function InterviewForm({
  handleScheduleInterview,
  isLoading,
  scheduled,
  setScheduled,
  interviewType,
  setInterviewType,
  interviewer,
  setInterviewer,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  notes,
  setNotes,
  dates,
  times
}: InterviewFormProps) {
  return (
    <>
      {scheduled ? (
        <SuccessState 
          interviewType={interviewType}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onReschedule={() => setScheduled(false)}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InterviewTypeSelector 
              interviewType={interviewType} 
              setInterviewType={setInterviewType} 
            />
            
            <InterviewerSelector 
              interviewer={interviewer} 
              setInterviewer={setInterviewer} 
            />
          </div>
          
          <DateSelector 
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          
          <TimeSelector 
            times={times}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
          
          <AdditionalNotes 
            notes={notes}
            setNotes={setNotes}
          />
          
          <ScheduleButton 
            isLoading={isLoading}
            onClick={handleScheduleInterview}
          />
        </>
      )}
    </>
  );
}
