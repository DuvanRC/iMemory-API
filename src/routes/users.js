const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/create", (req, res) => {
  console.log(req.body);
  res.send("recibido");
});

module.exports = router;
