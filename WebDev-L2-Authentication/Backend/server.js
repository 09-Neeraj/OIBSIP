const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(cookieParser());



app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Login Authentication API is running"
    });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});