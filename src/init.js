import "regenerator-runtime";
import "dotenv/config.js";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import app from "./server.js"
import "./models/Comment.js";

const PORT = process.env.PORT || 3000;

const 리스너 = () => console.log(`http://localhost:${PORT}로 접속중입니다`);

app.listen(PORT, 리스너);