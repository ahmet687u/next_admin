import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, "İsim alanı zorunlu bir alandır"),
  email: z.string().email("Geçerli bir email girdiğinizden emin olun"),
  password: z.string().min(5, "Şifre alanı 5 karakterden fazla olmalı"),
});

export type TSignUpSchema = z.infer<typeof schema>;
