import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;

const handler = async (req: any, res: any) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({
      message: "Database connection failed",
    });
  }
};

// Local development
if (process.env.NODE_APP_ENVIRONMENT !== "PRODUCTION") {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database failed to connect locally:", error);
    });
}

export default handler;