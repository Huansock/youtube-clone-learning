import
express
from "express";
import {
    logout,
    see,
    startGithubLogin,
    finishGithubLogin,
    getEdit,
    postEdit,
    getChangePassword,
    postChangePassword,

} from "../controllers/userController.js";
import {
    protectorMiddleware,
    publicOnlyMiddleware,
    avatarUpload
} from "../middleware.js";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware, ).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.get("/:id", see);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword)



export default userRouter;