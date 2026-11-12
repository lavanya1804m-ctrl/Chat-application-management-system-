const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database");

const router = express.Router();

// Registration
router.post("/register", async (req, res) => {
const { username, email, password, dob } = req.body;

if (!username || !email || !password) {
    return res.status(400).json({
        message: "All required fields must be filled"
    });
}

try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, email, password, dob) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, dob || null],
        (err) => {
            if (err) {
                return res.status(400).json({
                    message: "Registration failed"
                });
            }

            res.json({
                message: "Registration successful"
            });
        }
    );
} catch (error) {
    res.status(500).json({ message: "Server error" });
}

});

// Login
router.post("/login", (req, res) => {
const { email, password } = req.body;

db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = results[0];

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                dob: user.dob
            }
        });
    }
);

});

module.exports = router;