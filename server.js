const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const users = ["existingUser1", "existingUser2"];

app.post("/api/login", (req, res) => {
	const {userid} = req.body;

	if (users.includes(userid)) {
		res
			.status(400)
			.json({error: "이미 존재하는 사용자입니다."});
	} else {
		users.push(userid);
		res.status(200).json({userid});
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
