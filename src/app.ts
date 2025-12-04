import cors from "cors";
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { ENV } from "./config/env";
import { authLimiter } from "./middleware/limitter.middleware";
import { AuthRouter } from "./modules/auth/auth.routes";
import { AppError } from "./utils/app.error";

export default class App {
  PORT = ENV.PORT;
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.set("trust proxy", 1);
  }

  private routes(): void {
    const authRouter = new AuthRouter();

    this.app.use("/api/user", authLimiter, authRouter.getRouter());
  }

  private errorHandler() {
    this.app.use(
      (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            error: err.message,
          });
        }

        console.error(err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    );
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`➜ [API] Local: http://localhost:${this.PORT}/`);
    });
  }
}
