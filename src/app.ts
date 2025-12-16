import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./app/config/index.js";
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

export default app;
