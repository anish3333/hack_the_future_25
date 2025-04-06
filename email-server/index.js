// server.js - Main Express server file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// API endpoint to send interview scheduling email
app.post('/api/schedule-interview', async (req, res) => {
    try {
        const {
            recipientEmail,
            candidateName,
            interviewerName,
            interviewDate,
            interviewTime,
            interviewDuration,
            interviewLocation,
            interviewType,
            additionalDetails,
            meetingLink,
            contactPerson
        } = req.body;

        // Validate required fields
        if (!recipientEmail || !candidateName || !interviewDate || !interviewTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Email template
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #2c3e50; text-align: center;">Interview Scheduled</h2>
        <p>Hello ${candidateName},</p>
        <p>We're excited to confirm your upcoming interview with our team!</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #3498db;">Interview Details</h3>
          <p><strong>Date:</strong> ${interviewDate}</p>
          <p><strong>Time:</strong> ${interviewTime}</p>
          <p><strong>Duration:</strong> ${interviewDuration || '45 minutes'}</p>
          <p><strong>Interview Type:</strong> ${interviewType || 'Not specified'}</p>
          ${interviewLocation ? `<p><strong>Location:</strong> ${interviewLocation}</p>` : ''}
          ${meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
          ${interviewerName ? `<p><strong>Interviewer:</strong> ${interviewerName}</p>` : ''}
        </div>
        
        ${additionalDetails ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #3498db;">Additional Information</h3>
          <p>${additionalDetails}</p>
        </div>
        ` : ''}
        
        <p>If you need to reschedule or have any questions, please contact ${contactPerson?.name || 'our hiring team'} at ${contactPerson?.email || process.env.EMAIL_USER}.</p>
        
        <div style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 12px;">
          <p>Best regards,</p>
          <p>The Hiring Team</p>
        </div>
      </div>
    `;

        // Send email
        const mailOptions = {
            from: `"Interview Team" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: `Interview Scheduled: ${interviewDate} at ${interviewTime}`,
            html: htmlContent,
            // Optional calendar invite attachment
            ...(req.body.includeCalendarInvite && {
                icalEvent: {
                    method: 'REQUEST',
                    content: generateICalEvent({
                        start: new Date(`${interviewDate}T${interviewTime}`),
                        duration: interviewDuration || 45,
                        summary: `Interview with ${candidateName}`,
                        description: additionalDetails || '',
                        location: interviewLocation || meetingLink || ''
                    })
                }
            })
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Interview scheduling email sent successfully'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send interview scheduling email',
            error: error.message
        });
    }
});

// Helper function to generate iCal event (simplified version)
function generateICalEvent({ start, duration, summary, description, location }) {
    // Convert start string to a Date object first
    const startDate = new Date(start);

    // Create end date
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + parseInt(duration));

    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    return `BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//Interview Scheduler//EN
  BEGIN:VEVENT
  UID:${Date.now()}@interview-scheduler
  DTSTAMP:${formatDate(new Date())}
  DTSTART:${formatDate(startDate)}
  DTEND:${formatDate(endDate)}
  SUMMARY:${summary}
  DESCRIPTION:${description}
  LOCATION:${location}
  STATUS:CONFIRMED
  END:VEVENT
  END:VCALENDAR`;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});