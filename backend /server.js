const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
res.send("Welcome to Mindora Backend!");
});

const PORT = 5000;

app.listen(PORT, () => {
console.log("Mindora Server running on port ${PORT}");
});