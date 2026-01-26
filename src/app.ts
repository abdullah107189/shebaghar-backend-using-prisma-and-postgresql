import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import config from "./config/index.js";
import router from "./app/routes/index.js";
const app: Application = express();

//---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
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
