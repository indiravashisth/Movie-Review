//server code
import express from "express";
import cors from "cors";
import reviews from "./api/routes.js";

const app = express();

// to use middleware app.use()
app.use(cors());
app.use(express.json()); //will allow server to accept json in the body of a request

app.use("/api/v1/reviews", reviews);
// app.use("/:universalURL", (req, res) =>
//   res.status(404).json({ error: "Not Found" })
// );

export default app;
