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
