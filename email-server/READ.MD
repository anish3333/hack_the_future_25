npm i
nodemon index.js

POST http://localhost:3000/api/schedule-interview
body: {
  "recipientEmail": "sohamaversekar777@gmail.com",
  "candidateName": "Anish",
  "interviewerName": "Soham Aversekar",
  "interviewDate": "2025-04-15",
  "interviewTime": "14:00",
  "interviewDuration": "60 minutes",
  "interviewLocation": "Conference Room 3B",
  "interviewType": "Technical Interview",
  "meetingLink": "https://zoom.us/j/123456789",
  "additionalDetails": "Please bring your resume and be prepared to discuss your recent projects.",
  "contactPerson": {
    "name": "HR Department",
    "email": "hr@gitfather.com"
  },
  "includeCalendarInvite": true
}

// change recipientEmail above to anishawasthi24@gmail.com