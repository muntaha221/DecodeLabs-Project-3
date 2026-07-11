const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();

app.use(express.json());

const PORT = 3000;

mongoose.connect(
    "mongodb+srv://muhammadmuntaha1012_db_user:muntaha1012%40%40@cluster0.yukqhan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Welcome to Project 3");
});

// CREATE USER
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully!",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET ALL USERS
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET SINGLE USER
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE USER
app.put("/users/:id", async (req, res) => {
    console.log("PUT route hit");

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully!",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});