import React from "react";
import { logout } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useLogOut = () => {
  const queryClient = useQueryClient();
  const {
    mutate: logoutMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { logoutMutate, isPending, error };
};

export default useLogOut;
