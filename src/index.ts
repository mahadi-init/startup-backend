import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import routes from "./routes";
import cookieParser from "cookie-parser";

const PORT = 7000;
const app = express();

// Favicon handler with caching
app.get("/favicon.ico", (req, res) => {
  const iconPath = path.join(__dirname, "public", "favicon.ico");
  if (fs.existsSync(iconPath)) {
    res.setHeader("Content-Type", "image/x-icon");
    res.setHeader("Cache-Control", "public, max-age=604800"); // 1 week cache
    fs.createReadStream(iconPath).pipe(res);
  } else {
    res.status(204).end();
  }
});

app.get("/", (_, res) => {
  res.status(200).json({
    sucess: true,
    message: "welcome to api",
  });
});

//middlewares
app.use(
  cors({
    origin: [`http://localhost:${PORT}`],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
    ],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// route declare
app.use("/api", routes);

// Error handling middleware (should be after all other middleware and routes)
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  const code = (err as any).statusCode || 500;

  res.status(code).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(`Listening or port ${PORT}`);
});
