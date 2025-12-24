import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./config/index.js";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
const app: Application = express();

//---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Shebaghar API!",
    environment: config.node_dev,
    uptime: process.uptime().toFixed(2) + "sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
