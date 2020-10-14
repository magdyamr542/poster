import { connectDB } from "./db";
import { router } from "./routes/routes";
import cors = require("cors");
require("dotenv").config();
import express = require("express");

// for env vars
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      PORT?: string;
      JWT_SECRET: string;
    }
  }
}

// getting the middlewares
const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  // connect to the database
  await connectDB("poster");
  app.use("/", router); // entry point to all the different routes of the app
  app.listen(parseInt(process.env.PORT!), () =>
    console.log("Server Started on port " + process.env.PORT)
  );
};

main();
