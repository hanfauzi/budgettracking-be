import { sign } from "jsonwebtoken";
import { CreateTokenProps } from "../types/jwt";

export const createToken = ({
  payload,
  secretKey,
  options,
}: CreateTokenProps) => {
  return sign(payload, secretKey, options);
};
