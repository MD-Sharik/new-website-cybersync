import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

app.post('/api/contact', async (req, res) => {
  const {
    from_name,
    last_name,
    email,
    phone, // Handled implicitly via reply_to or body
    reply_to, // This might differ from 'email' if we want to support a separate field, but usually they are 1:1. Frontend sends 'email' as the field name, but mapped to 'email' in payload? 
    // Actually frontend sends: email: formData.get('email')
    // Let's verify payload keys from frontend: 
    // from_name, last_name, email, phone, job_title, company, country, role, licenses, interest, detailed_interests, message, newsletter
    job_title,
    company,
    country,
    role,
    licenses,
    detailed_interests, // Array of strings
    interest,
    message,
    newsletter
  } = req.body;

  // Map 'email' to reply_to if not explicitly provided, or use whatever we have.
  const userEmail = email || reply_to;

  if (!userEmail || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const detailedList = Array.isArray(detailed_interests) ? detailed_interests.join(', ') : detailed_interests;

  const mailOptions = {
    from: `"Cybersync Lead" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: userEmail,
    subject: `Quote Request: ${interest} - ${company}`,
    text: `
Name: ${from_name} ${last_name}
Title: ${job_title}
Company: ${company}
Email: ${userEmail}
Phone: ${phone || 'N/A'}
Country: ${country}
Role: ${role}
Licenses: ${licenses}

Interest: ${interest}
Specifics: ${detailedList || 'None'}
Newsletter: ${newsletter ? 'Yes' : 'No'}

Message:
${message}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #000000; color: #ffffff; padding: 24px; text-align: center; }
        .content { padding: 32px; color: #333333; }
        .section-title { font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .field-label { font-size: 11px; text-transform: uppercase; color: #999; margin-bottom: 2px; }
        .field-value { font-size: 14px; font-weight: 600; color: #111; }
        .message-box { background-color: #f9f9f9; padding: 16px; border-left: 4px solid #000000; font-size: 14px; line-height: 1.5; }
        .highlight { color: #0066cc; }
        .footer { background-color: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #888888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p style="margin: 0; font-size: 18px; font-weight: 600;">New Quote Request</p>
            <p style="margin: 4px 0 0 0; opacity: 0.7; font-size: 12px;">${new Date().toLocaleString()}</p>
        </div>
        <div class="content">
            
            <div class="section-title">Contact Information</div>
            <div class="grid">
                <div>
                    <div class="field-label">Name</div>
                    <div class="field-value">${from_name} ${last_name}</div>
                </div>
                <div>
                    <div class="field-label">Job Title</div>
                    <div class="field-value">${job_title || '-'}</div>
                </div>
                <div>
                    <div class="field-label">Email</div>
                    <div class="field-value"><a href="mailto:${userEmail}" style="color: #0066cc; text-decoration: none;">${userEmail}</a></div>
                </div>
                 <div>
                    <div class="field-label">Phone</div>
                    <div class="field-value">${phone || '-'}</div>
                </div>
            </div>

            <div class="section-title">Organization</div>
            <div class="grid">
                <div>
                    <div class="field-label">Company</div>
                    <div class="field-value">${company || '-'}</div>
                </div>
                 <div>
                    <div class="field-label">Country</div>
                    <div class="field-value">${country || '-'}</div>
                </div>
                 <div>
                    <div class="field-label">Role Type</div>
                    <div class="field-value">${role || '-'}</div>
                </div>
                 <div>
                    <div class="field-label">Licenses</div>
                    <div class="field-value">${licenses || '-'}</div>
                </div>
            </div>

            <div class="section-title">Requirements</div>
            <div style="margin-bottom: 24px;">
                <div class="field-label">Primary Interest</div>
                <div class="field-value highlight" style="font-size: 16px;">${interest}</div>
                
                ${detailedList ? `
                <div style="margin-top: 12px;">
                    <div class="field-label">Specific Products</div>
                    <div class="field-value">${detailedList}</div>
                </div>
                ` : ''}
            </div>

            <div class="section-title">Additional Message</div>
            <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
            </div>

             <div style="margin-top: 24px; font-size: 12px; color: #888;">
                Newsletter Opt-in: <strong>${newsletter ? 'YES' : 'NO'}</strong>
            </div>

        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Cyber Sync System
        </div>
    </div>
</body>
</html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.json({ success: true, message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
