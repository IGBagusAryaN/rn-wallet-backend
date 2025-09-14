import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js";

dotenv.config();

const app = express();
if (process.env.NODE_ENV === "production") job.start();


const PORT = process.env.PORT || 5001;



app.use(rateLimiter)
// middleware
app.use(express.json());

// our custom simple middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a req, the method is", req.method);
//     next()
// });

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok"})
})

app.use("/api/transactions", transactionsRoute)


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server runn in PORT:${PORT}`);
  });
});
