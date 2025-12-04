import { SignOptions } from "jsonwebtoken";

export interface CreateTokenProps {
  payload: Record<string, unknown>;
  secretKey: string;
  options?: SignOptions;
}
