import z from "zod";

export const gendersSchema = z.enum(["male", "female"]);

export type Gender = z.infer<typeof gendersSchema>;