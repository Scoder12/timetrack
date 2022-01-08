import { z } from "zod";

const schema = z.object({
  HOST: z.string(),
  PORT: z.number(),
});
export const CONFIG = schema.parse(process.env);
