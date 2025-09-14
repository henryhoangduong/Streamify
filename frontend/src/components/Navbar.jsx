import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useLocation, Link, Links } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, LogOutIcon, ShipWheel, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogOut from "../hooks/useLogOut";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  // const queryClient = useQueryClient();

  if (!authUser) return null;

  // const { mutate: logoutMutate } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });
  const { logoutMutate } = useLogOut();
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to={"/"} className="flex items-center gap-2.5">
                <ShipWheelIcon />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
            {/* TODO */}
            <ThemeSelector />
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  rel="noreferrer"
                />
              </div>
            </div>
            {/* LOGOUT */}
            <button className="btn btn-ghost btn-circle" onClick={logoutMutate}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
