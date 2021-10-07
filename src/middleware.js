import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})
const multerUploader = multerS3({
    s3: s3,
    bucket: 'yangtubee',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
})

export const localsmiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteName = "WETUBE";
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next()

    } else {
        req.flash("error", "Login first");
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next()
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/")
    }
}
export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
    storage: multerUploader
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 100000000,
    },
    storage: multerUploader
});
export const s3DeleteAvatarMiddleware = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    s3.deleteObject({
            Bucket: `yangtubee`,
            Key: `images/${req.session.user.avatarURL.split('/')[4]}`,
        },
        (err, data) => {
            if (err) {
                throw err;
            }
            console.log(`s3 deleteObject`, data);
        }
    );
    next();
};