import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const handleOpen = () => console.log("conneted to DB ")
const db = mongoose.connection;
db.on("error", (error) => console.log("database err", error));
db.once("open", handleOpen)