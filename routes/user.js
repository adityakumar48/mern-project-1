import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../model/user.js";

router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.userAdd.isAdmin) {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }
    } else {
      return res
        .status(400)
        .json({ error: "you can update only your account" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ message: "account has been updated" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
