import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app.error";

export class JwtVerify {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      // 1️⃣ Ambil token dari httpOnly cookie dulu
      const cookieToken = req.cookies?.accessToken;

      // 2️⃣ Fallback ke Authorization header
      const headerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

      // 3️⃣ Final token (pilih cookie kalau ada)
      const token = cookieToken || headerToken;

      if (!token) {
        throw new AppError("Access token must be provided", 401);
      }

      // 4️⃣ Verify token
      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      // 5️⃣ Simpan payload ke res.locals (sesuai style kamu)
      res.locals.payload = payload;

      next();
    } catch (error) {
      next(error);
    }
  }
}


  //   static verifyRole(authorizeRole: Role[]) {
  //     return async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         const { role } = res.locals.payload;

  //         if (!authorizeRole.includes(role)) {
  //           throw new AppError("User role unauthorized access", 401);
  //         }

  //         next();
  //       } catch (error) {
  //         next(error);
  //       }
  //     };
  //   }

