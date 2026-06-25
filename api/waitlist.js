import { createHash } from 'node:crypto';
import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM_EMAIL = process.env.AURIEM_FROM_EMAIL || 'Auriem <hello@auriem.app>';
const NOTIFY_EMAIL = process.env.AURIEM_WAITLIST_NOTIFY_EMAIL || 'info@auriem.app';
const SUPPORT_EMAIL = 'support@auriem.app';
const LOGO_URL = 'https://www.auriem.app/logo.png';
const SOURCE_OPTIONS = new Set([
  'A friend shared it',
  'Instagram',
  'LinkedIn',
  'Search',
  'Newsletter',
  'Community',
  'Other',
]);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const getBody = (request) => {
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return request.body ?? {};
};

const getSubmissionId = (email, submittedAt) =>
  createHash('sha256').update(`${email.toLowerCase()}:${submittedAt}`).digest('hex').slice(0, 32);

export const getWelcomeText = () => `You're on the Auriem private preview.

Thank you for joining us early.

Auriem is becoming a quieter place to plan, focus, and follow through without turning your day into another dashboard to manage.

Your place is saved. There is nothing to download yet, and we will send one thoughtful note when your invitation is ready.

Until then, take the softer way in.

Auriem
https://auriem.app

Questions? Reply to this email or contact ${SUPPORT_EMAIL}.`;

export const getWelcomeHtml = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>You're on the Auriem private preview</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f4fa;color:#18233f;font-family:Inter,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your place in Auriem's private preview is saved.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f4fa;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">
            <tr>
              <td align="center" style="padding:0 8px 20px;">
                <img src="${LOGO_URL}" alt="Auriem" width="92" style="display:block;width:92px;max-width:100%;height:auto;border:0;filter:drop-shadow(0 12px 26px rgba(114,125,255,0.22));">
                <div style="margin-top:12px;color:#18233f;font-size:12px;font-weight:700;letter-spacing:4.5px;text-transform:uppercase;">Auriem</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0;border:1px solid #e0e1f3;border-radius:32px;background:#ffffff;box-shadow:0 24px 70px rgba(82,96,143,0.10);overflow:hidden;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:24px 42px 0;background:linear-gradient(180deg,#f7f8ff 0%,#ffffff 100%);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                        <tr>
                          <td style="height:1px;background:linear-gradient(90deg,rgba(101,93,239,0.00) 0%,rgba(101,93,239,0.32) 22%,rgba(101,93,239,0.12) 100%);font-size:0;line-height:0;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 42px 38px;background:#ffffff;">
                <p style="margin:0 0 18px;color:#655def;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">Private Preview</p>
                <h1 style="margin:0;color:#18233f;font-size:42px;line-height:1.08;letter-spacing:-1.4px;font-weight:750;">You&rsquo;re in.</h1>
                <p style="margin:20px 0 0;color:#616d86;font-size:17px;line-height:1.7;">Thank you for joining us early.</p>
                <p style="margin:12px 0 0;color:#616d86;font-size:17px;line-height:1.7;">Auriem is becoming a quieter place to plan, focus, and follow through&mdash;without turning your day into another dashboard to manage.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:30px 0 28px;border:1px solid #ececf8;border-radius:20px;background:#f8f8ff;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <p style="margin:0 0 7px;color:#18233f;font-size:14px;font-weight:700;">Your place is saved.</p>
                      <p style="margin:0;color:#6f7890;font-size:14px;line-height:1.6;">There is nothing to download yet. We&rsquo;ll send one thoughtful note when your invitation is ready.</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;color:#18233f;font-size:17px;line-height:1.7;">Until then, take the softer way in.</p>
                <p style="margin:24px 0 0;color:#655def;font-size:15px;font-weight:700;">Auriem</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 20px 0;color:#7a869f;font-size:12px;line-height:1.7;">
                <a href="https://auriem.app" style="color:#655def;text-decoration:none;">auriem.app</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#655def;text-decoration:none;">${SUPPORT_EMAIL}</a>
                <br>
                You received this because you joined the Auriem private preview.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const getNotificationHtml = ({ email, sourceChoice, signupPage, submittedAt }) => `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f5fa;color:#18233f;font-family:Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:28px;border:1px solid #e3e5ef;border-radius:20px;background:#ffffff;">
      <p style="margin:0 0 8px;color:#655def;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Auriem Private Preview</p>
      <h1 style="margin:0 0 22px;font-size:26px;">New signup</h1>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px;"><strong>How they found Auriem:</strong> ${escapeHtml(sourceChoice)}</p>
      <p style="margin:0 0 8px;"><strong>Signup page:</strong> ${escapeHtml(signupPage)}</p>
      <p style="margin:0;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
    </div>
  </body>
</html>`;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const body = getBody(request);
  const email = String(body.email ?? '').trim().toLowerCase();
  const honeypot = String(body.company ?? '').trim();
  const sourceChoice = String(body.sourceChoice ?? '').trim();

  // Return success to bots without sending anything.
  if (honeypot) {
    return response.status(200).json({ success: true });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return response.status(400).json({ message: 'Enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return response.status(503).json({ message: 'Email service is not configured.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const submittedAt = new Date().toISOString();
  const submissionId = getSubmissionId(email, submittedAt);

  if (sourceChoice && !SOURCE_OPTIONS.has(sourceChoice)) {
    return response.status(400).json({ message: 'Choose a valid source option.' });
  }

  const signupPage = String(request.headers.referer ?? 'Auriem landing page').slice(0, 300);
  const sourceLabel = sourceChoice || 'Not shared';

  try {
    const [welcomeResult, notificationResult] = await Promise.all([
      resend.emails.send(
        {
          from: FROM_EMAIL,
          to: email,
          replyTo: SUPPORT_EMAIL,
          subject: "You're on the Auriem private preview",
          html: getWelcomeHtml(),
          text: getWelcomeText(),
        },
        { idempotencyKey: `auriem-welcome-${submissionId}` },
      ),
      resend.emails.send(
        {
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          replyTo: email,
          subject: 'New Auriem private preview signup',
          html: getNotificationHtml({ email, sourceChoice: sourceLabel, signupPage, submittedAt }),
          text: `New Auriem private preview signup\n\nEmail: ${email}\nHow they found Auriem: ${sourceLabel}\nSignup page: ${signupPage}\nSubmitted: ${submittedAt}`,
        },
        { idempotencyKey: `auriem-notify-${submissionId}` },
      ),
    ]);

    if (welcomeResult.error || notificationResult.error) {
      console.error('Resend rejected a waitlist email.', {
        welcome: welcomeResult.error,
        notification: notificationResult.error,
      });
      return response.status(502).json({ message: 'Unable to send the confirmation email.' });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Waitlist email failed.', error);
    return response.status(500).json({ message: 'Unable to join the preview right now.' });
  }
}
