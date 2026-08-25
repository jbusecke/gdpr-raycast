export const SUBJECT = "GDPR Notice — Stop Processing and Remove My Email Address";

export function firstName(fullName: string, fallback: string): string {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  return first.length > 0 ? first : fallback;
}

export function buildBody(params: { addressee: string; email: string; yourName: string }): string {
  const { addressee, email, yourName } = params;
  return [
    `Dear ${addressee},`,
    "",
    "I object to your processing of my personal data for direct marketing under Article 21 of the GDPR.",
    "",
    "Stop sending emails to this address immediately and remove it from all marketing lists, mailing databases, and suppression-list exceptions:",
    "",
    `Email address: ${email}`,
    "",
    "I also request erasure of my personal data under Article 17 GDPR, except where retention is legally required. Do not contact me again for marketing purposes or share my information with third parties.",
    "",
    "Please confirm that you have completed this request. If I receive further unsolicited messages, I may report them to the relevant data protection authority and email provider.",
    "",
    "Regards,",
    yourName,
  ].join("\n");
}
