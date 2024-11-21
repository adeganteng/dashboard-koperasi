import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Tolong masukan email"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
