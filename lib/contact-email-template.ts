type ContactEmailTemplateInput = {
  name: string;
  email: string;
  message: string;
  hasAttachment: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmailTemplate(input: ContactEmailTemplateInput): {
  subject: string;
  text: string;
  html: string;
} {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br/>");
  const attachmentLabel = input.hasAttachment ? "Yes" : "No";

  const subject = `Portfolio note from ${input.name}`;
  const text = [
    "Someone left a note through your portfolio contact form.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Attachment: ${attachmentLabel}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px; color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
      <tr>
        <td style="padding:20px 24px; border-bottom:1px solid #e5e7eb;">
          <h1 style="margin:0; font-size:20px; line-height:1.2;">New portfolio note</h1>
          <p style="margin:8px 0 0; font-size:14px; color:#4b5563;">Someone used your site contact form and left the details below.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 8px; font-size:14px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 8px; font-size:14px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#55198b; text-decoration:none;">${safeEmail}</a></p>
          <p style="margin:0 0 16px; font-size:14px;"><strong>Attachment:</strong> ${attachmentLabel}</p>
          <div style="border:1px solid #e5e7eb; border-radius:8px; padding:14px; background:#f9fafb;">
            <p style="margin:0; font-size:14px; line-height:1.5;"><strong>Message</strong><br/>${safeMessage}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>`.trim();

  return { subject, text, html };
}
