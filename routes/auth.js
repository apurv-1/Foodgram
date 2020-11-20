const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_PASS, EMAIL, PASS } = require("../config/keys");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL,
		pass: PASS,
	},
});

router.post("/signup", (req, res) => {
	const { name, email, password, pic } = req.body;
	if (!email || !password || !name) {
		return res.status(422).json({ error: "Please fill the fields" });
	}
	User.findOne({ email: email })
		.then((savedUser) => {
			if (savedUser) {
				return res.status(422).json({ error: "This user already exists" });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const user = new User({
					pic,
					name,
					email,
					password: hashedpassword,
				});

				user
					.save()
					.then((user) => {
						transporter.sendMail({
							to: user.email,
							from: EMAIL,
							subject: "Sign Up Successfull",
							html:
								"<h3>Welcome to Foodgram! Enjoy the Plateform & Show the world you're a true foodie.. <br /> Cheers!</h3> ",
						});
						res.json({ message: "Signed up successfully!" });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(422).json({ error: "Fill both the fields" });
	}
	User.findOne({ email: email }).then((savedUser) => {
		if (!savedUser) {
			return res.status(422).json({ error: "Invalid Email or Password" });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then((doMatch) => {
				if (doMatch) {
					// res.json({message:"Signed In successfully"})
					const token = jwt.sign({ _id: savedUser._id }, JWT_PASS);
					const { _id, name, email, followers, following, pic } = savedUser;
					res.json({ token, user: { _id, name, email, followers, following, pic } });
				} else {
					return res.status(422).json({ error: "Invalid Email or Password" });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

router.post("/reset-password", (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
		}
		const token = buffer.toString("hex");
		User.findOne({ email: req.body.email }).then((user) => {
			if (!user) {
				return res.status(422).json({ error: "Email does not Exists!!" });
			}
			user.resetToken = token;
			user.expireToken = Date.now() + 900000;
			user.save().then((result) => {
				transporter.sendMail({
					to: user.email,
					from: EMAIL,
					subject: " Password Reset",
					html: `
                <h3>Looks like you forgot your password? Don't worry dude!</h3>
                <h4>
                <a href="${EMAIL}/reset-password/${token}">
                Click here</a>to Change your passowrd..</h4>
                `,
				});
				res.json({ message: "Check your mail! Link will expire in 15mins.." });
			});
		});
	});
});

router.post("/new-password", (req, res) => {
	const newPassword = req.body.password;
	const sentToken = req.body.token;
	User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
		.then((user) => {
			if (!user) {
				return res.status(422).json({ error: "Password Expired! ..Try again! lmao.." });
			}
			bcrypt.hash(newPassword, 12).then((hashedpassword) => {
				user.password = hashedpassword;
				user.resetToken = undefined;
				user.expireToken = undefined;
				user.save().then((savedUser) => {
					res.json({ message: "Updated password Successfully!.." });
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
