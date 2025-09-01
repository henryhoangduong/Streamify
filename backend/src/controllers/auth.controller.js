import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";
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
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
      isOnboarded: false,
    });
    // TODO: Create the user in the stream as well
    try {
      await upsertStreamUser({
        id: newUser,
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
    } catch (error) {
      console.log("Error creating stream user: ", error);
    }

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

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are  required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      succes: true,
      user,
    });
  } catch (error) {
    console.log("Error logining user", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ succes: true, message: "Successful logout" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    console.log(req.body);
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        isOnboarded: true,
      },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(
        `Stream user updated after onboarding for ${updatedUser.fullName}`
      );
    } catch (streamError) {
      console.error("Error updating user info in stream", streamError.message);
    }

    res.status(200).json({ succes: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
