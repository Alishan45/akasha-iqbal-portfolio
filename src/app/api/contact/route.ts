import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const safeName = escapeHtml(String(name).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safeMessage = escapeHtml(String(message).trim()).replace(/\n/g, "<br />");
    const password = (process.env.SMTP_PASSWORD || process.env.EMAIL_APP_PASSWORD || "").replace(/\s/g, "");
    if (!process.env.SMTP_EMAIL || !password || !process.env.SMTP_HOST) return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_EMAIL, pass: password } });

    // 1. Notify Akasha of the new inquiry
    await transporter.sendMail({
      from: `Akasha Iqbal Portfolio <${process.env.SMTP_EMAIL}>`,
      to: process.env.EMAIL_ADDRESS || process.env.SMTP_EMAIL,
      replyTo: String(email).trim(),
      subject: `[Akasha Iqbal] New portfolio inquiry from ${String(name).trim()}`,
      text: `NEW PORTFOLIO INQUIRY\n\nFrom: ${String(name).trim()}\nEmail: ${String(email).trim()}\n\n${String(message).trim()}\n\nAkasha Iqbal | English Educator & Literary Researcher`,
      html: `<!doctype html><html><body style="margin:0;background:#eef1ef;color:#17211d;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;background:#eef1ef"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#f7f4ee"><tr><td style="padding:28px 32px;background:#17211d;color:#f7f4ee"><div style="font-size:12px;letter-spacing:3px;text-transform:uppercase">Akasha Iqbal<span style="color:#be5d3c">.</span></div><div style="margin-top:22px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a7b79e">New portfolio inquiry</div></td></tr><tr><td style="padding:36px 32px"><h1 style="margin:0 0 28px;font:400 30px Georgia,serif;color:#17211d">Someone wants to connect.</h1><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #ccd2cd"><tr><td style="padding:16px 0;border-bottom:1px solid #ccd2cd;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#be5d3c;width:100px">Name</td><td style="padding:16px 0;border-bottom:1px solid #ccd2cd;font-size:16px">${safeName}</td></tr><tr><td style="padding:16px 0;border-bottom:1px solid #ccd2cd;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#be5d3c">Email</td><td style="padding:16px 0;border-bottom:1px solid #ccd2cd;font-size:16px"><a href="mailto:${safeEmail}" style="color:#17211d">${safeEmail}</a></td></tr></table><div style="margin-top:28px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#be5d3c">Message</div><p style="font:17px/1.6 Georgia,serif;margin:12px 0 0">${safeMessage}</p><a href="mailto:${safeEmail}" style="display:inline-block;margin-top:30px;padding:14px 18px;background:#17211d;color:#f7f4ee;text-decoration:none;font-size:11px;letter-spacing:1px;text-transform:uppercase">Reply to ${safeName} &nbsp; ↗</a></td></tr><tr><td style="padding:20px 32px;background:#e4e9e4;color:#53605a;font-size:11px;letter-spacing:1px">AKASHA IQBAL &nbsp; / &nbsp; ENGLISH EDUCATOR · LITERARY RESEARCHER</td></tr></table></td></tr></table></body></html>`,
    });

    // 2. Auto-reply to the sender
    const autoReplyHtml = `<!doctype html>
<html>
<body style="margin:0;background:#eef1ef;color:#17211d;font-family:Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;background:#eef1ef">
<tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#f7f4ee">
  <tr>
    <td style="padding:28px 32px;background:#17211d;color:#f7f4ee">
      <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase">Akasha Iqbal<span style="color:#be5d3c">.</span></div>
      <div style="margin-top:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a7b79e">Automated reply</div>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 32px">
      <h1 style="margin:0 0 20px;font:400 26px Georgia,serif;color:#17211d">Thank you for reaching out, ${safeName}.</h1>
      <p style="font:16px/1.7 Georgia,serif;margin:0 0 16px;color:#3a4a40">
        I have received your message and will get back to you as soon as possible.
        I appreciate you taking the time to write, and I look forward to our conversation.
      </p>
      <p style="font:16px/1.7 Georgia,serif;margin:0 0 32px;color:#3a4a40">
        In the meantime, feel free to explore my portfolio or read my research thesis at
        <a href="https://akashaiqbal.vercel.app" style="color:#be5d3c;text-decoration:none">akashaiqbal.vercel.app</a>.
      </p>
      <div style="border-top:2px solid #17211d;padding-top:24px;margin-top:8px">
        <p style="margin:0;font-size:15px;line-height:1.8;color:#17211d">
          Best regards,<br />
          <strong style="font-size:17px">Akasha Iqbal</strong><br />
          BS (Hons) English Literature<br />
          University of the Punjab
        </p>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:20px 32px;background:#e4e9e4;color:#53605a;font-size:11px;letter-spacing:1px">
      AKASHA IQBAL &nbsp; / &nbsp; ENGLISH EDUCATOR · LITERARY RESEARCHER
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    await transporter.sendMail({
      from: `Akasha Iqbal <${process.env.SMTP_EMAIL}>`,
      to: String(email).trim(),
      subject: `Thank you for your message, ${String(name).trim()}`,
      text: `Dear ${String(name).trim()},\n\nThank you for reaching out. I have received your message and will get back to you as soon as possible.\n\nBest regards,\n\nAkasha Iqbal\nBS (Hons) English Literature\nUniversity of the Punjab`,
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Email delivery is unavailable" }, { status: 503 }); }
}