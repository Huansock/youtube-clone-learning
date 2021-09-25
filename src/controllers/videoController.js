import
Video from "../models/Video"

export const trending = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({
            createdAt: "desc",
        })
        res.render("home", {
            pageTitle: "Home",
            videos
        })
    } catch (error) {
        console.log(error)
        return res.render("server-err", {
            error
        })
    }
};

export const search = async (req, res) => {
    const {
        keyword
    } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            },
        });
    }
    return res.render("search", {
        pageTitle: "Search",
        videos
    });
};
export const watch = async (req, res) => {
    const {
        id
    } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {
            pageTitle: `${id}은 검색이 안되네요.`
        })
    }
    return res.render("watch", {
        pageTitle: `watching ${video.title}`,
        video
    });


};
export const getEdit = async (req, res) => {
    const {
        id
    } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {
            pageTitle: `${id}은 검색이 안되네요.`
        })
    }
    return res.render("edit", {
        pageTitle: `editing :${video.title}`,
        video,

    });

};
export const postEdit = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        description,
        hashtags
    } = req.body;
    const video = await Video.exists({
        _id: id
    });
    if (!video) {
        return res.status(404).render("404", {
            pageTitle: `${id}은 검색이 안되네요.`
        })
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);

};
export const deleteVideo = async (req, res) => {
    const {
        id
    } = req.params;
    await Video.findByIdAndDelete(id);
    //delete video
    return res.redirect("/")
};


export const getUpload = (req, res) => {
    return res.render("upload", {
        pageTitle: "upload video"
    })
};

export const postUpload = async (req, res) => {
    const {
        title,
        description,
        hashtags
    } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        })
        return res.redirect("/");
    } catch (errror) {
        console.log(errror);
        return res.status(400).render("upload", {
            pageTitle: "upload video",
            errorMessage: errror._message,
        })
    }
};