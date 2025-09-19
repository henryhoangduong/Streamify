import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  useCallStateHooks,
  StreamTheme,
  CallingState,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });
  useEffect(() => {
    const initCall = async () => {
      if (!tokenData || !authUser || !callId) {
        try {
          console.log("Initializing Stream video client .....");
          const user = {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          };
          const videoClient = new StreamVideoClient({
            apiKey: STREAM_API_KEY,
            user,
            token: tokenData.token,
          });

          const callInstance = videoClient.call("default", callId);
          await callInstance.join({ create: true });
          console.log("Joined call succesfully");
        } catch (error) {
          console.error("Error joining call: ", error);
          toast.error("Could not join the call please try again");
        } finally {
          setIsConnecting(false);
        }
      }
    };
    initCall();
  });

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div></div>
    </div>
  );
};

export default CallPage;
