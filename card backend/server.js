require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const corsOptions = {
    origin: process.env.Frontend_link ,
    credentials: true,
    //  ["http://localhost:5173", "https://frontend-flashcard-tuf.onrender.com"], // Allow both local and deployed frontend
};

app.use(express.json());
app.use(cors(corsOptions));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to the database.");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM card";
    db.query(sql, (err, data) => {
        if (err) return res.status(400).json({ error: "Error retrieving data" });
        return res.status(200).json(data);
    });
});

app.post("/create", (req, res) => {
    const sql = "INSERT INTO card (`question`, `answer`) VALUES (?, ?)";
    const values = [req.body.question, req.body.answer];

    db.query(sql, values, (err, data) => {
        if (err) return res.status(400).json({ error: "Error: " + err.message });
        return res.status(200).json("Flashcard added successfully");
    });
});

app.patch("/update/:id", (req, res) => {
    const sql = "UPDATE card SET question = ?, answer = ? WHERE ID = ?";
    const values = [req.body.question, req.body.answer];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.status(400).json({ error: "Error: " + err.message });
        return res.status(200).json("Flashcard updated successfully");
    });
});

app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM card WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(400).json({ error: "Error: " + err.message });
        return res.status(200).json("Flashcard deleted successfully");
    });
});

const port = process.env.PORT || 6001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});