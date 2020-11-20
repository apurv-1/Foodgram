const express = require("express");
const myapp = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");

mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
	console.log("Connected to Database!");
});
mongoose.connection.on("error", (err) => {
	console.log("error connecting", err);
});

require("./models/user");
require("./models/post");

myapp.use(express.json());
myapp.use(require("./routes/auth"));
myapp.use(require("./routes/post"));
myapp.use(require("./routes/user"));

if (process.env.NODE_ENV == "production") {
	myapp.use(express.static("client/build"));
	const path = require("path");
	myapp.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

myapp.listen(PORT, () => {
	console.log("Server is running", PORT);
});
