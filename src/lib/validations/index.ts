import * as z from "zod"

export const UserFormValidation = z.object({
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  email: z.string().email(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});
