import
Video from "../models/Video.js"
import
User from "../models/User.js"
import Comment from "../models/Comment.js";
export const trending = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({
        createdAt: "desc"
      })
      .populate("owner").populate("comments");
    return res.render("home", {
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
        $regex: new RegExp(`[${keyword}]`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", {
    pageTitle: "Search",
    videos
  })
  if (!keyword) {
    return res.sendStatus(404);
  };
};
export const watch = async (req, res) => {
  const {
    id
  } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.render("404", {
      pageTitle: `${id}은 검색이 안되네요.`
    })
  }
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
    req.flash("error", "Not authorized");
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
  req.flash("success", "Changes saved.");
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
    req.flash("error", "You are not the the owner of the video.");
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
    video,
    thumb
  } = req.files;
  const {
    title,
    description,
    hashtags,
  } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].location,
      thumbUrl: thumb[0].location,
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

export const registerView = async (req, res) => {
  const {
    id
  } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: {
      user
    },
    body: {
      text
    },
    params: {
      id
    },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  console.log(text)
  video.save();
  return res.status(201).json({
    newCommentId: comment._id
  });
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user
    },
    params: {
      id: commentId
    }
  } = req;
  const comment = await Comment.findById(commentId).populate("video").populate("owner");
  if (!comment) {
    return res.sendStatus(404);
  }
  if (String(user._id) !== String(comment.owner._id)) {
    return res.Status(403).redirect("/");

  }
  await Comment.findByIdAndDelete(commentId);
  return res.status(200).redirect(`/videos/${comment.video._id}`);
}