require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const corsOptions = {
    origin: "https://frontend-tuf-flashcard.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
 
app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM card";
    db.query(sql, (err, data) => {
        if(err) return res.status(400).json("Error");
        else return res.status(200).json(data);
    })

})

app.post("/create", (req, res) => {
    const sql = "INSERT INTO card (`question`, `answer`) VALUES (?, ?)";
    const values = [
        req.body.question,
        req.body.answer
    ];

    if (!req.body.question || !req.body.answer) {
        return res.status(400).json("Question and answer fields are required.");
    }

    db.query(sql, values, (err, data) => {
        if (err) return res.status(400).json("Error: " + err.message);
        else return res.status(200).json("Flashcard added successfully");
    });
});


app.patch("/update/:id", (req, res) => {
    const sql = "UPDATE card SET question = ?, answer = ? WHERE ID = ?";
    const values = [
        req.body.question,
        req.body.answer
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.status(400).json("Error: " + err.message);
        else return res.status(200).json("Flashcard updated successfully");
    });
});

app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM card WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.status(400).json("Error: " + err.message);
        else return res.status(200).json("Flashcard updated successfully");
    });
});


const port = process.env.PORT || 6001 ;
app.listen(port, () => {
    console.log(`Server is running at ${port}`) 
})
