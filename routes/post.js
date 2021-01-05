const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
mongoose.set("useFindAndModify", false);

router.get("/allpost", requireLogin, (req, res) => {
	Post.find()
		.populate("postedBy", "_id name pic")
		.populate("comments.postedBy", "_id name")
		.sort("-createdAt")
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/followingpost", requireLogin, (req, res) => {
	Post.find({ postedBy: { $in: req.user.following } })
		.populate("postedBy", "_id name pic")
		.populate("comments.postedBy", "_id name")
		.sort("-createdAt")
		.then((posts) => {
			res.json({ posts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createpost", requireLogin, (req, res) => {
	const { body, pic } = req.body;
	if (!body || !pic) {
		return res.status(422).json({ error: "Please fill all the Fields" });
	}
	const post = new Post({
		photo: pic,
		body,
		postedBy: req.user,
	});
	post
		.save()
		.then((result) => {
			res.json({ post: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/myposts", requireLogin, (req, res) => {
	Post.find({ postedBy: req.user._id })
		.populate("postedBy", "_id name pic")
		.then((myposts) => {
			res.json({ myposts });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.put("/like", requireLogin, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { likes: req.user._id },
		},
		{
			new: true,
		}
	)
		.populate("postedBy", "_id name pic")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

router.put("/unlike", requireLogin, (req, res) => {
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$pull: { likes: req.user._id },
		},
		{
			new: true,
		}
	)
		.populate("postedBy", "_id name pic")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

router.put("/comment", requireLogin, (req, res) => {
	const comment = {
		text: req.body.text,
		postedBy: req.user._id,
	};
	Post.findByIdAndUpdate(
		req.body.postId,
		{
			$push: { comments: comment },
		},
		{
			new: true,
		}
	)
		.populate("comments.postedBy", "_id name")
		.populate("postedBy", "_id name pic")
		.exec((err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			} else {
				res.json(result);
			}
		});
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
	Post.findOne({ _id: req.params.postId })
		.populate("postedBy", "_id")
		.exec((err, post) => {
			if (err || !post) {
				return res.status(422).json({ error: err });
			}
			if (post.postedBy._id.toString() === req.user._id.toString()) {
				post
					.remove()
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
});

module.exports = router;
