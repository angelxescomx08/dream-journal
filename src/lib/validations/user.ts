import z from "zod";
import { gendersSchema } from "./genders";

export const userSchema = z.object({
	user_id: z.string().uuid("El campo id debe ser un UUID v4"),
	name: z
		.string()
		.min(2, "La longitud mínima de un nombre es de 2 caracteres")
		.max(25, "La longitud máxima de un nombre es de 25 caracteres"),
	last_name: z
		.string()
		.min(2, "La longitud mínima de un apellido es de 2 caracteres")
		.max(50, "La longitud máxima de un apellido es de 50 caracteres"),
	birthday: z.string().datetime(),
	gender: gendersSchema,
});

export const createUserSchema = userSchema.extend({
	birthday: z.coerce.date({
    message: "La fecha de nacimiento no es válida",
  }),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
