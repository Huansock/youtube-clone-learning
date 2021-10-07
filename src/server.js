import express, {
    response,
    Router
} from "express";

import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";


// 다른 파일에서 익스포트한 변수를 여기로 가져옵시다
import rootRouter from "./routers/rootRouter.js";
import videoRouter from "./routers/videoRouters.js";
import userRouter from "./routers/userRouters.js";
import {
    localsmiddleware
} from "./middleware.js";
import apiRouter from "./routers/apiRouter.js";
import flash from "express-flash";

const app = express();
const logger = morgan("dev");

// app.use()는 글로벌 미들웨어를 만들어 준다캄
app.use(logger);

// 글로벌 라우터 만들기

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views")
app.use(logger)
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    })

}));
// cross부분
/*app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});*/
app.use(flash());
app.use(localsmiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);
export default app;