import { prisma } from "../../db/prisma";
import { createToken } from "../../lib/jwt";
import { PasswordService } from "../../lib/password";
import { AppError } from "../../utils/app.error";
import { LoginDTO } from "./dto/user-login.dto";
import { RegisterDTO } from "./dto/user-register.dto";

export class AuthService {
  private passwordService: PasswordService;
  constructor() {
    this.passwordService = new PasswordService();
  }

  registerUser = async ({ name, email, password }: RegisterDTO) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new AppError("Email is required", 400);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return { message: "User registered succesfully" };
  };

  loginUser = async ({ email, password }: LoginDTO) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail && !password) {
      throw new AppError("Email and Password is required", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = createToken({
      payload,
      secretKey: process.env.JWT_SECRET!,
      options: { expiresIn: "15m" },
    });

    return { accessToken };
  };
}
