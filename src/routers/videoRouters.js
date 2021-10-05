import
express
from "express";


import {
    watch,
    getEdit,
    deleteVideo,
    getUpload,
    postEdit,
    postUpload,

} from "../controllers/videoController.js"
import {
    protectorMiddleware,
    videoUpload,
} from "../middleware.js";

const videoRouter = express.Router();

// upload를 위로 두어야 express가 /upload를 id로 착각하지 않음.
// 그래서 정규식으로 문자열에서 몇몇애들을 뽑아오는 거임.
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.fields([{
    name: "video"
}, {
    name: "thumb"
}]), postUpload);


// ↑아래 코드의 단축버전
// videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
// videoRouter.post("/:id([0-9a-f]{24})/edit", postEdit);



export default videoRouter;