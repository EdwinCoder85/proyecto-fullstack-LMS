import { z } from "zod";
const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "Revisa el formato del email" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener entre 6 y 12 caracteres" })
    .max(12, {
      message: "La contraseña debe contener entre 6 y 12 caracteres",
    }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio" }),
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "Revisa el formato del email" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener entre 6 y 12 caracteres" })
    .max(12, {
      message: "La contraseña debe contener entre 6 y 12 caracteres",
    })
    .optional(),
  confirmPassword: z
    .string()
    .min(6, { message: "La contraseña debe contener entre 6 y 12 caracteres" })
    .max(12, {
      message: "La contraseña debe contener entre 6 y 12 caracteres",
    }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  image: z
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
});

export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "La contraseña debe contener entre 6 y 12 caracteres" })
    .max(12, {
      message: "La contraseña debe contener entre 6 y 12 caracteres",
    })
    .optional(),
  confirmPassword: z
    .string()
    .min(6, { message: "La contraseña debe contener entre 6 y 12 caracteres" })
    .max(12, {
      message: "La contraseña debe contener entre 6 y 12 caracteres",
    }),
});


export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "Revisa el formato del email" }),
});
