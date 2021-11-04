import mongoose from "mongoose";

const instance = mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      min: 3,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 3,
      required: true,
    },
    profilePic: {
      type: String,
      default: "no pic",
    },
    coverPic: {
      type: String,
      default: "no pic",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("USERS", instance);

export default User;
