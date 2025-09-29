import { z } from 'zod';

const schemaModalOTPConfirmationOtpForm = (minimal: number) =>
  z.object({
    otp: z
      .string({ required_error: 'Kolom ini harus diisi!' })
      .min(1, 'Kolom ini harus diisi!')
      .min(minimal, `Minimal ${minimal} karakter!`)
  });

export default schemaModalOTPConfirmationOtpForm;
