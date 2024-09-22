import { Role } from "app/common/enums";
import { z } from "zod";

export const verifyLinkSchema = z.object({
    body: z.object({
      id: z
        .string({ message: "id required" }),
      role: z.enum([Role.DOCTOR, Role.INSURANCE, Role.PATIENT]),
    }),
  });
  
export const mobileNumberSchema = z.string().regex(
  new RegExp(`^(/^91/|/^61/)\\d{10}$`),
  'Mobile number should be in the format [country-code][10-digit-mobile-number]. Only Indian and Australian numbers are supported.'
);
