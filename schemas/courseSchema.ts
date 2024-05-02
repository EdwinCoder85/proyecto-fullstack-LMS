import { z } from "zod";
const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(300, {
      message: "El nombre debe tener menos de 300 caracteres",
    }),
  description: z
    .string()
    .min(20, {
      message: "La descripción debe tener al menos 20 caracteres",
    })
    .max(580, {
      message: "La descripción  debe tener menos de 580 caracteres",
    }),
  price: z
    .number()
    .min(0, { message: "El precio debe ser mayor a 0." })
    .max(500, { message: "El precio debe ser menor o igual a 500." })
    .positive("Precio no puede ser vacio"),
  oldPrice: z.number(),
  vote: z.number(),
  imageUrl: z
    .any()
    .nullable()
    .refine((files) => {
      if (files === null || files.length === 0) {
        return false;
      }
      return true; // Pasa la validación si hay al menos un archivo
    }, "Por favor, carga una imagen.")
    .refine((files) => {
      // Verificar si el archivo es undefined
      if (files[0] === undefined) {
        return false; // No pasa la validación si no hay archivo
      }
      // Validar tipo de archivo
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "La imagen debe ser .jpg, .jpeg, .png o .webp.")
    .refine((files) => {
      if (files[0] === undefined) {
        return false; // No pasa la validación si no hay archivo
      }
      // Validar tamaño del archivo
      return files[0].size <= MAX_FILE_SIZE;
    }, "La imagen debe tener un tamaño máximo de 10MB."),
  categories: z
    .string()
    .min(1, { message: "Por favor, selecciona una categoría." }),
  bestSeller: z.boolean(),
});
