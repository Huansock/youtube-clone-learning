import "dotenv/config";
import "./db"
import "./models/Video";
import "./models/User";
import app from "./server"

const PORT = 3000;

const 리스너 = () => console.log(`http://localhost:${PORT}로 접속중입니다`);

app.listen(PORT, 리스너);