import express from "express";
import {
    getJoin,
    getLogin,
    postJoin,
    postLogin,
} from "../controllers/userController.js";

import {
    trending,
    search
} from "../controllers/videoController.js"
import {
    protectorMiddleware,
    publicOnlyMiddleware
} from "../middleware.js";

const rootRouter = express.Router();


rootRouter.get("/", trending)
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin)
rootRouter.route("/login").all(publicOnlyMiddleware, ).get(getLogin).post(postLogin)
rootRouter.get("/search", search)

// 라우터 변수만 익스포트하기
export default rootRouter;