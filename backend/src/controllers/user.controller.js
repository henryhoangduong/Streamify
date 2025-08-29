import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        {
          $id: { $nin: currentUser.friends },
        },
        {
          isOnboarded: true,
        },
      ],
    });
    return res.status(200).json(recommendedUser);
  } catch (error) {
    console.error("Error in getRecommedUsers controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    if (myId == recipientId) {
      return res.status(400).json({
        message: "You cant send request to yourself",
      });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({
        message: "Recipient not found",
      });
    }
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      });
    }
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        {
          sender: recipientId,
          recipient: myId,
        },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "A friend requeset already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(201).json(friendRequest);
  } catch (error) {}
};
