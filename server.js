import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import { connectDB, getAllBlogs, addBlog, getBlogById, subscribeEmail, getAllSubscribers } from './blog/blogServiceDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
if (MONGODB_URI) {
  connectDB(MONGODB_URI);
} else {
  console.warn('MONGODB_URI not found in .env file');
}

app.use(cors());
app.use(express.json());

// Blog API endpoints
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json({ success: true, blogs });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, blog });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching blog' });
  }
});

app.post('/api/blogs', async (req, res) => {
  const { title, content, image, author, category } = req.body;
  if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content required' });
  try {
    const blog = await addBlog({ title, content, image, author, category });
    const blogData = {
      ...blog.toObject ? blog.toObject() : blog,
      id: blog._id.toString()
    };
    
    // Send notification emails to all subscribers
    const subscribers = await getAllSubscribers();
    let successCount = 0;
    let failedEmails = [];
    
    if (subscribers.length > 0) {
      const blogUrl = `https://www.cyber-sync.in/#/blog/${blog._id.toString()}`;
      const excerpt = blog.excerpt || content.substring(0, 150) + '...';
      
      for (const email of subscribers) {
        try {
          const mailOptions = {
            from: `"Cybersync Blog" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: email,
            subject: `📢 New Blog Post: ${title}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
        .header { background: linear-gradient(135deg, #00f0ff 0%, #0088ff 100%); padding: 30px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; }
        .content { padding: 32px 24px; color: #e0e0e0; }
        .blog-title { color: #00f0ff; font-size: 20px; font-weight: bold; margin: 0 0 12px 0; }
        .blog-meta { color: #888; font-size: 13px; margin-bottom: 16px; }
        .blog-meta span { margin-right: 16px; }
        .blog-excerpt { color: #ccc; line-height: 1.6; margin: 16px 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #0088ff 100%); color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 6px; margin-top: 16px; font-weight: bold; }
        .footer { background-color: #0a0a0a; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Blog Post</h1>
        </div>
        <div class="content">
            <p style="margin-top: 0;">Hello,</p>
            <p class="blog-title">${title}</p>
            <div class="blog-meta">
                <span>📅 ${new Date(blog.date).toLocaleDateString()}</span>
                <span>✍️ ${author || 'Cybersync Team'}</span>
                ${category ? `<span>🏷️ ${category}</span>` : ''}
            </div>
            <div class="blog-excerpt">
                ${excerpt}
            </div>
            <a href="${blogUrl}" class="cta-button">Read Full Article</a>
            <p style="margin-top: 30px; font-size: 13px; color: #888;">
                Stay tuned for more insights from Cybersync
            </p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Cybersync. All rights reserved.
        </div>
    </div>
</body>
</html>
            `
          };
          
          await transporter.sendMail(mailOptions);
          successCount++;
        } catch (emailError) {
          console.error(`Failed to send email to ${email}:`, emailError);
          failedEmails.push(email);
        }
      }
      
      if (failedEmails.length > 0) {
        console.warn(`Notifications sent to ${successCount}/${subscribers.length} subscribers. Failed: ${failedEmails.join(', ')}`);
      } else {
        console.log(`Blog notifications sent to all ${successCount} subscribers`);
      }
    }
    
    res.json({ 
      success: true, 
      blog: blogData, 
      message: 'Blog published successfully!',
      notificationsSent: successCount,
      notificationsFailed: failedEmails.length
    });
  } catch (e) {
    console.error('Error adding blog:', e);
    res.status(500).json({ success: false, message: 'Failed to add blog' });
  }
});

// Newsletter subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required' });
  }
  
  try {
    // Save subscriber to database
    await subscribeEmail(email);
    
    const mailOptions = {
      from: `"Cybersync Newsletter" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to Cybersync Newsletter! 🎉',
      html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #00f0ff 0%, #0088ff 100%); color: #ffffff; padding: 40px 24px; text-align: center; }
        .content { padding: 32px; color: #333333; }
        .highlight { color: #00f0ff; font-weight: bold; }
        .footer { background-color: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #888888; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Cybersync</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Enterprise Solutions & Innovation</p>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for subscribing to our newsletter! You'll now receive the latest updates on:</p>
            <ul style="color: #555; line-height: 1.8;">
                <li>🔬 <span class="highlight">Simulation Technology</span> - Advanced tools for complex system modeling</li>
                <li>📊 <span class="highlight">Data Analytics</span> - Insights and intelligence for your business</li>
                <li>🤖 <span class="highlight">AI Solutions</span> - Cutting-edge artificial intelligence implementations</li>
                <li>📈 <span class="highlight">Case Studies</span> - Real-world success stories and best practices</li>
            </ul>
            <p>Stay tuned for exclusive content, webinars, and special offers!</p>
            <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Cybersync Team</strong><br>
                <em style="color: #00f0ff;">Enterprise Intelligence Architects</em>
            </p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Cybersync. All rights reserved.<br>
            You received this email because you subscribed to our newsletter.
        </div>
    </div>
</body>
</html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Subscription confirmed! Check your email.' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
});

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
    phone,
    reply_to, 
    job_title,
    company,
    country,
    role,
    licenses,
    detailed_interests,
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
