import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are  required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/public/${idx}.png`;
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
      isOnboarded: false,
    });
    // TODO: Create the user in the stream as well

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      succes: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error signing up user", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function login(req, res) {
  res.send("Login Route");
}

export function logout(req, res) {
  res.send("Logoout Route");
}
