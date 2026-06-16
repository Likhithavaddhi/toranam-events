const path = require("path");
console.log("Starting Server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(
"mongodb://likhithavaddhidbuser:Likhitha123@ac-zgn1f7b-shard-00-00.hknz39v.mongodb.net:27017,ac-zgn1f7b-shard-00-01.hknz39v.mongodb.net:27017,ac-zgn1f7b-shard-00-02.hknz39v.mongodb.net:27017/toranamDB?ssl=true&replicaSet=atlas-jswvoc-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/book-event", async (req, res) => {
    try {

        const newBooking = new Booking({
            name: req.body.name,
            phone: req.body.phone,
            eventType: req.body.eventType,
            eventDate: req.body.eventDate
        });

        await newBooking.save();

        res.json({
            success: true,
            message: "Booking Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Booking Failed"
        });
    }
});


app.get("/bookings", async (req, res) => {
    try {

        const bookings = await Booking.find();

        res.json(bookings);

    } catch (err) {

        res.status(500).json({
            message: "Error fetching bookings"
        });

    }
});

app.delete("/bookings/:id", async (req, res) => {
    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            message: "Booking Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});