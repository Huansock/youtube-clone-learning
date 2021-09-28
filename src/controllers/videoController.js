import
Video from "../models/Video"
import
User from "../models/User"

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
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", {
      pageTitle: `${id}은 검색이 안되네요.`
    })
  }
  console.log(video.owner.name);
  return res.render("watch", {
    pageTitle: `watching ${video.title}`,
    video,
  });


};
export const getEdit = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    user: {
      _id
    }
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", {
      pageTitle: `${id}은 검색이 안되네요.`
    })
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
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
    user: {
      _id
    }
  } = req.session;
  const {
    title,
    description,
    hashtags
  } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", {
      pageTitle: `${id}은 검색이 안되네요.`
    })
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
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
  const {
    user: {
      _id
    }
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", {
      pageTitle: `${id}은 검색이 안되네요.`
    })
  };
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  //delete video
  return res.redirect("/");
}


export const getUpload = (req, res) => {
  return res.render("upload", {
    pageTitle: "upload video"
  })
};

export const postUpload = async (req, res) => {
  const {
    user: {
      _id
    }
  } = req.session;
  const {
    path: fileUrl
  } = req.file;
  const {
    title,
    description,
    hashtags,
  } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    })
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (errror) {
    console.log(errror);
    return res.status(400).render("upload", {
      pageTitle: "upload video",
      errorMessage: errror._message,
    })
  }
}