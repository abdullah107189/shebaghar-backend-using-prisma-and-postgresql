import { Server } from "http";
import app from "./app.js";

async function serverStart() {
  // This variable will hold our server instance
  let server: Server;
  server = app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
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
