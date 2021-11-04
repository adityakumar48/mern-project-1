import express from "express";
const router = express.Router();
import User from "../model/user.js";
import bcrypt from "bcrypt";

// signup user
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(422).json({ error: "please fill the all fields" });
    }
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(422).json({ error: "username already exist" });
    }
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(422).json({ error: "email already exist" });
    }
    const hashPass = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashPass,
    });
    const userAdd = await user.save();
    if (userAdd) {
      res.status(200).json({ message: "user successfully added !" });
    } else {
      res.status(422).json({ error: "user signup failed !" });
    }
  } catch (error) {
    console.log(error);
  }
});

// signin user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "please fill the all fields" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const passMatch = await bcrypt.compare(password, userLogin.password);

      if (passMatch) {
        res.status(200).json({ message: "user signin successfully" });
      } else {
        res.status(400).json({ error: "invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials !" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
