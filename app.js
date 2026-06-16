app.post("/book-event", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        res.status(201).json({
            message: "Booking Saved Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});