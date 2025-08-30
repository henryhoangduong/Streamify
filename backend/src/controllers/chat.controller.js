import { generateStreamToken } from "../lib/stream";

export const getStreamToken = async (req, res) => {
  try {
      const token = generateStreamToken(req.user.id);
      
    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
