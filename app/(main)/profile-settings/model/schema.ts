import { z } from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .min(6, 'Minimum 6 characters')
    .max(30, 'Maximum 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only Latin letters, numbers, _ and -'),
  firstName: z
    .string()
    .min(1, 'Required field')
    .max(50, 'Maximum 50 characters')
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Only letters'),
  lastName: z
    .string()
    .min(1, 'Required field')
    .max(50, 'Maximum 50 characters')
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, 'Only letters'),
  dateOfBirth: z
    .date()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age >= 13;
    }, { message: 'A user under 13 cannot create a profile.' }),
  country: z.string().optional(),
  city: z.string().optional(),
  aboutMe: z.string().max(200, 'Maximum 200 characters').optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;