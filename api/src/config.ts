import envSchema from "env-schema";
import S from "fluent-json-schema";

export const schema = S.object()
  .prop("HOST", S.string().default("127.0.0.1"))
  .prop("PORT", S.number().required());

export const CONFIG = envSchema({ schema }) as { HOST: string; PORT: number };
