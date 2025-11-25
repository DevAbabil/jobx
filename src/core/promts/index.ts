import type { IJobxApply, IJobxConfig } from '@/types';

export const emailPrompts = (payload: {
  jobxApply: Partial<IJobxApply>;
  jobxConfig: Partial<IJobxConfig>;
}) => {
  const profileData = {
    ...payload.jobxConfig,
    apply: {
      company: payload.jobxApply.company ?? '',
      subject: payload.jobxApply.subject ?? '',
      position: payload.jobxApply.position ?? '',
      experience: payload.jobxApply.experience ?? '',
      education: payload.jobxApply.education ?? '',
      ...payload.jobxApply,
    },
  };

  return `You are generating an email body using the following profile data:

PROFILE JSON:
${JSON.stringify(profileData, null, 2)}

TASK:
Create a professional job application email BODY ONLY.

TEAM/COMPANY NAME RULE:
- Use apply.company if provided and non-empty.
- If apply.company is missing or empty, generate a short, realistic software or creative team name yourself (e.g., "CodeAbabil", "PixelForge", "DevNest").
- Use it in the greeting like: "Hi [company/team name] Team,".

VARIABLE USAGE RULES:
- Use apply.role if provided; otherwise, use "the role you’re hiring for".
- Include experience or education only if the field is non-empty.
- Mention skills naturally in sentences; do NOT output as bullet points or comma-only lists.
- Do NOT leave blank placeholders if optional fields are missing.

STYLE REFERENCE (match tone & flow):
"Hi CodeAbabil Team,

I’m applying for the Web Developer Intern role. I work with Next.js, TypeScript, Redux Toolkit,
and REST APIs, and I enjoy building clean, functional web apps. I’m also familiar with Strapi and always quick to pick up new tools.

Your team’s learning-focused and creative culture really resonates with me, and I’d love to contribute while growing alongside the team. I’m based in Dhaka and fully comfortable working remotely.

I’ve attached my CV/portfolio for your review.
Looking forward to hearing from you!

Best,
Md Ababil Hossain (Ababil)
Portfolio | GitHub"

STRICT RULES:
- Output ONLY the email body.
- NO subject line.
- NO JSON or meta text in output.
- Greeting must follow the rule above (use company if exists, otherwise auto-generate).
- Mention relevant skills naturally within the email text.
- Mention experience/education only if they exist and are non-empty.
- End with a closing + name from profile.
- Footer must appear exactly as Markdown links:
  [Portfolio](${profileData.links?.portfolio || ''}) | [GitHub](${profileData.links?.github || ''})
- Keep the tone concise, friendly, and professionally casual.
- Avoid repeating the team/company name unnecessarily.

BEGIN NOW:`;
};
