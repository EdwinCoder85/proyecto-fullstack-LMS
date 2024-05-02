import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(40, {
      message: "El nombre debe tener menos de 40 caracteres",
    }),
  description: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(180, {
      message: "La descripción  debe tener menos de 180 caracteres",
    }),
});
