import StreamChat from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream key or secret is missing ");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (userData) => {
  try {
    const userData = await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error creating stream user: ", error);
  }
};

//TODO: generate stream token
export const generateStreamToken = (userID) => {};
