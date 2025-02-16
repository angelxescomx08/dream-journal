import { z } from "zod";

export const dreamSchema = z.object({
  dream_id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1, { message: "El título es obligatorio" }),
  content: z.string().min(1, { message: "El contenido es obligatorio" }),
  created_at: z.string().datetime(),
});

export type Dream = z.infer<typeof dreamSchema>;
