import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    active: {
      type: Boolean,
    },
    phone: {
      type: String,
      minLength: 10,
      maxLength: 12,
    },
    profile_pic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
