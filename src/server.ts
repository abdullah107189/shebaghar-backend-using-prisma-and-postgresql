import { Server } from "http";
import app from "./app.js";
import config from "./config/index.js";

async function serverStart() {
  // This variable will hold our server instance
  let server: Server;
  server = app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });

  // Function to gracefully shut down the server
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("server closed gracefully");
      });
    } else {
      process.exit(1);
    }
  };

  // --- Listen for Unhandled Errors ---
  process.on("unhandledRejection", (error) => {
    console.error("💥 Unhandled Rejection! Shutting down...", error);
    exitHandler();
  });

  // For synchronous errors that are not caught
  process.on("uncaughtException", (error) => {
    console.error("💥 Unhandled Rejection! Shutting down...", error);
    exitHandler();
  });
}
//start the server by calling our startServer function
serverStart();
