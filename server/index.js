const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads", "prescriptions");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
    res.send("YoniMediCare API is running...");
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/medicines", require("./routes/medicines"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/audit", require("./routes/audit"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});