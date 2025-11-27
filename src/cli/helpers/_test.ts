import colors from 'colors';
import z, { ZodError, type ZodTypeAny } from 'zod';
import type { Efile } from '@/types';
import { logger } from '@/utils';

const ZJobxCredentialsSchema = z
  .object({
    client_email: z.string().email(),
    private_key: z
      .string()
      .min(50)
      .refine(
        (s) =>
          /^-----BEGIN PRIVATE KEY-----\n([A-Za-z0-9+/=\n\r]+)-----END PRIVATE KEY-----\n?$/.test(
            s
          ),
        {
          message:
            'private_key must be a valid PEM (-----BEGIN PRIVATE KEY----- ...).',
        }
      ),
    spreadsheet_id: z.string().refine((s) => /^[A-Za-z0-9-_]{20,}$/.test(s), {
      message: 'spreadsheet_id looks invalid.',
    }),
    lsa_user: z.string().email(),
    lsa_pass: z.string().min(6),
    open_ai_secret: z
      .string()
      .refine((s) => /^sk-[A-Za-z0-9\-_]{20,}$/.test(s), {
        message:
          "open_ai_secret must start with 'sk-' and follow expected pattern.",
      }),
  })
  .strict();

const ZJobxConfigSchema = z
  .object({
    contact: z
      .object({
        email: z.string().email('Invalid email address'),
        phone: z
          .string()
          .min(7, 'Phone number is too short')
          .max(20, 'Phone number is too long'),
      })
      .strict(),

    links: z
      .object({
        github: z.string().url('GitHub must be a valid URL'),
        linkedIn: z.string().url('LinkedIn must be a valid URL'),
        portfolio: z.string().url('Portfolio must be a valid URL'),
      })
      .strict(),

    profile: z
      .object({
        address: z.string().min(3, 'Address is too short'),
        name: z.string().min(2, 'Name is too short'),
      })
      .strict(),

    skills: z
      .array(z.string().min(1, 'Skill cannot be empty'))
      .min(1, 'At least one skill is required'),
  })
  .strict();

const ZJobxApplySchema = z
  .object({
    subject: z.string().min(3, 'Subject is too short'),
    company_email: z
      .string()
      .email('Company email must be a valid email address'),
    company: z.string().min(2, 'Company name is too short'),
    company_website: z.string().url('Company website must be a valid URL'),
    education: z.string().min(3, 'Education info is too short'),
    experience: z.string().min(3, 'Experience info is too short'),
    job_source: z.string().url('Company website must be a valid URL'),
    location: z.enum(['Remote', 'Onsite']),
    position: z.string().min(2, 'Position title is too short'),
  })
  .strict();

const test = async (testFiles: (keyof typeof Efile)[]) => {
  const testMap: Partial<
    Record<keyof typeof Efile, { data: unknown; schema: ZodTypeAny }>
  > = {
    'jobx.apply.json': {
      data: (await import('@/core/data')).default.apply,
      schema: ZJobxApplySchema,
    },
    'jobx.config.json': {
      data: (await import('@/core/data')).default.config,
      schema: ZJobxConfigSchema,
    },
    'jobx.credentials.json': {
      data: (await import('@/core/data')).default.credentials,
      schema: ZJobxCredentialsSchema,
    },
  };

  let err: boolean = false;
  const i = 1;
  for (const testFile of testFiles) {
    const entry = testMap[testFile];

    if (!entry) continue;

    const { data, schema } = entry;

    try {
      await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        for (const issue of error.issues) {
          logger.error(
            `${colors.bold(colors.green(testFile))} ${colors.blue(issue.path.join(', '))} -> ${colors.gray(issue.message)}`
          );
        }
      } else {
        logger.error(`[${testFile}]: Unexpected error`);
      }
      err = true;
    }
  }

  if (err) {
    process.exit(1);
  } else {
    logger.info(`All test has been passed!`);
  }
};

export default test;
