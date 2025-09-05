import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { ShipWheelIcon } from "lucide-react";
import image from "../../public/i.png";
import { Loader2 } from "lucide-react";
import useLogin from "../hooks/useLogin";
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { isPending, error, mutate: loginMutate } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutate(loginData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGING DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message} </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">
                  Sign in to your account to continue your language journey
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="form-control w-full space-y-2">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    required
                    onChange={(e) => {
                      setLoginData({ ...loginData, email: e.target.value });
                    }}
                  />
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="label">Email</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="..............."
                    className="input input-bordered w-full"
                    value={loginData.password}
                    required
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                    }}
                  />
                </div>
                <button
                  disabled={isPending}
                  className="btn btn-primary w-full"
                  type="submit"
                >
                  {isPending && <Loader2 className="animate-spin" />} Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* ILLUSTRATION */}
            <div className="relative aspect-square max-w-sm max-auto">
              <img src={image} alt="image" />
            </div>
            <div className="text-center space-y-3 mx-auto">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills toghether
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
