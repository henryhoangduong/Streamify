import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
const useAuthUser = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return { isLoading: isLoading, authUser: authData?.user };
};

export default useAuthUser;
