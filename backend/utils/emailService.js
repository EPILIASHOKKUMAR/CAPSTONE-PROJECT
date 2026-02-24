const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email service is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email service connection error:', error);
    return false;
  }
};

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text email body
 * @param {string} options.html - HTML email body (optional)
 * @returns {Promise<Object>} - Nodemailer send response
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email service not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
      from: `"Civic Reporter" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send a verification email to a new user
 * @param {Object} user - User object
 * @param {string} verificationToken - Token for email verification
 * @returns {Promise<Object>} - Email send result
 */
const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${user.email}`;
  
  return sendEmail({
    to: user.email,
    subject: 'Verify Your Email - Civic Reporter',
    text: `Hello ${user.name},\n\nThank you for registering with Civic Reporter. Please verify your email by clicking the link below:\n\n${verificationUrl}\n\nThis link will expire in 24 hours.\n\nIf you did not create an account, please ignore this email.\n\nRegards,\nThe Civic Reporter Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Verify Your Email Address</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with Civic Reporter. Please verify your email by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4b5563;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Regards,<br>The Civic Reporter Team</p>
      </div>
    `,
  });
};

/**
 * Send a password reset email
 * @param {Object} user - User object
 * @param {string} resetToken - Token for password reset
 * @returns {Promise<Object>} - Email send result
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${user.email}`;
  
  return sendEmail({
    to: user.email,
    subject: 'Password Reset - Civic Reporter',
    text: `Hello ${user.name},\n\nYou requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request a password reset, please ignore this email.\n\nRegards,\nThe Civic Reporter Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Password Reset Request</h2>
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #4b5563;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Regards,<br>The Civic Reporter Team</p>
      </div>
    `,
  });
};

/**
 * Send a notification email to admin about an urgent issue
 * @param {Object} admin - Admin user object
 * @param {Object} issue - Issue object
 * @returns {Promise<Object>} - Email send result
 */
const sendUrgentIssueNotification = async (admin, issue) => {
  const issueUrl = `${process.env.FRONTEND_URL}/admin/issues/${issue._id}`;
  
  return sendEmail({
    to: admin.email,
    subject: `URGENT: New High Priority Issue - ${issue.title}`,
    text: `Hello ${admin.name},\n\nA new high priority issue has been reported and requires your attention.\n\nIssue: ${issue.title}\nCategory: ${issue.category}\nPriority: ${issue.priority}\nLocation: ${issue.location.address}\nReported by: ${issue.user.name}\n\nPlease review this issue as soon as possible: ${issueUrl}\n\nRegards,\nThe Civic Reporter System`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">URGENT: New High Priority Issue</h2>
        <p>Hello ${admin.name},</p>
        <p>A new high priority issue has been reported and requires your attention.</p>
        <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0;">
          <p><strong>Issue:</strong> ${issue.title}</p>
          <p><strong>Category:</strong> ${issue.category}</p>
          <p><strong>Priority:</strong> ${issue.priority}</p>
          <p><strong>Location:</strong> ${issue.location.address}</p>
          <p><strong>Reported by:</strong> ${issue.user.name}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${issueUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Review Issue</a>
        </div>
        <p>Please review this issue as soon as possible.</p>
        <p>Regards,<br>The Civic Reporter System</p>
      </div>
    `,
  });
};

/**
 * Send issue submission confirmation email to user
 * @param {Object} user - User object
 * @param {Object} issue - Issue object
 * @returns {Promise<Object>} - Email send result
 */
const sendIssueSubmissionConfirmation = async (user, issue) => {
  const issueUrl = `${process.env.FRONTEND_URL}/issues/${issue._id}`;
  
  // Format category for display
  const categoryDisplay = issue.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return sendEmail({
    to: user.email,
    subject: `Issue Submitted Successfully - ${issue.title}`,
    text: `Hello ${user.firstName},\n\nThank you for submitting your civic issue report. We have received your request and our team will review it shortly.\n\nIssue Details:\nTitle: ${issue.title}\nCategory: ${categoryDisplay}\nPriority: ${issue.priority}\nLocation: ${issue.address || 'Location provided'}\nStatus: ${issue.status}\n\nYou can track the status of your issue here: ${issueUrl}\n\nWe appreciate your contribution to making our community better!\n\nRegards,\nThe Civic Reporter Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Issue Submitted Successfully!</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #374151;">Hello ${user.firstName},</p>
          
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
            Thank you for submitting your civic issue report. We have received your request regarding <strong>${categoryDisplay}</strong> and our team will review it shortly.
          </p>
          
          <div style="background-color: white; padding: 20px; margin: 25px 0; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #1f2937; font-size: 16px;">Issue Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Title:</strong></td>
                <td style="padding: 8px 0; color: #374151; font-size: 14px;">${issue.title}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Category:</strong></td>
                <td style="padding: 8px 0; color: #374151; font-size: 14px;">${categoryDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Priority:</strong></td>
                <td style="padding: 8px 0; color: #374151; font-size: 14px; text-transform: capitalize;">${issue.priority}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Location:</strong></td>
                <td style="padding: 8px 0; color: #374151; font-size: 14px;">${issue.address || 'Location provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Status:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                    ${issue.status}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${issueUrl}" style="background-color: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 14px;">Track Your Issue</a>
          </div>
          
          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46; font-size: 13px;">
              <strong>What happens next?</strong><br>
              Our team will review your submission and update the status accordingly. You'll receive email notifications when there are updates to your issue.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
            We appreciate your contribution to making our community better!
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
          
          <p style="font-size: 13px; color: #9ca3af; margin: 0;">
            Regards,<br>
            <strong style="color: #6b7280;">The Civic Reporter Team</strong>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
          <p style="margin: 5px 0;">This is an automated message. Please do not reply to this email.</p>
          <p style="margin: 5px 0;">If you have questions, please contact us through the app.</p>
        </div>
      </div>
    `,
  });
};

/**
 * Send a status update notification to a user
 * @param {string} email - User's email address
 * @param {string} name - User's first name
 * @param {string} issueTitle - Title of the issue
 * @param {string} newStatus - New status of the issue
 * @param {string} statusNotes - Notes about the status change
 * @param {string} issueUrl - URL to view the issue
 * @returns {Promise<Object>} - Email send result
 */
const sendStatusUpdateNotification = async (email, name, issueTitle, newStatus, statusNotes, issueUrl) => {
  // Map status to colors for HTML email
  const statusColors = {
    'New': '#f59e0b',
    'In Progress': '#3b82f6',
    'Resolved': '#10b981',
    'Closed': '#6b7280',
    'Reopened': '#ef4444'
  };
  
  const statusColor = statusColors[newStatus] || '#6b7280';
  
  return sendEmail({
    to: email,
    subject: `Issue Status Update: ${issueTitle}`,
    text: `Hello ${name},\n\nThe status of your reported issue has been updated.\n\nIssue: ${issueTitle}\nNew Status: ${newStatus}\n${statusNotes ? `Notes: ${statusNotes}\n` : ''}\nYou can view the full details here: ${issueUrl}\n\nThank you for using Civic Reporter.\n\nRegards,\nThe Civic Reporter Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Issue Status Update</h2>
        <p>Hello ${name},</p>
        <p>The status of your reported issue has been updated.</p>
        <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0;">
          <p><strong>Issue:</strong> ${issueTitle}</p>
          <p><strong>New Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${newStatus}</span></p>
          ${statusNotes ? `<p><strong>Notes:</strong> ${statusNotes}</p>` : ''}
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${issueUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">View Issue Details</a>
        </div>
        <p>Thank you for using Civic Reporter.</p>
        <p>Regards,<br>The Civic Reporter Team</p>
      </div>
    `,
  });
};

module.exports = {
  verifyConnection,
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendUrgentIssueNotification,
  sendStatusUpdateNotification,
  sendIssueSubmissionConfirmation,
};