import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import task from "./routes/task.js"
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req,res) => {
    return res.status(200).json({msg: "Your APIs run well"});
});

app.use("/api", task);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});