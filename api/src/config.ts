import { z } from "zod";

const schema = z.object({
  HOST: z.string(),
  PORT: z.string().regex(/^[0-9]+$/),
});
export const CONFIG = schema.parse(process.env);
