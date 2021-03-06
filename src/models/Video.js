import mongoose from "mongoose";

// 쿠키틀
const videoSchema = new mongoose.Schema({
    thumbUrl: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxlength: 200,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,

    },
    hashtags: [{
        type: String,
        trim: true,

    }],
    meta: {
        views: {
            type: Number,
            default: 0,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    fileUrl: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }, ],
});

videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`))
});
// 쿠키틀로 쿠키모델만들기
const Video = mongoose.model("Video", videoSchema);
export default Video;