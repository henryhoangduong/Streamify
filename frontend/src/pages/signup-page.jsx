import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShipWheelIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/signup", signUpData);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="w-9 h-9 text" />
            <span className="text-3xl font-bold ">Streamify</span>
          </div>
          {/* FORM */}
          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <br />
                {/* FULL NAME */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    value={signUpData.fullName}
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        fullName: e.target.value,
                      });
                    }}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="JohnDoe@example.com"
                    className="input input-bordered w-full"
                    value={signUpData.email}
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        email: e.target.value,
                      });
                    }}
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="-29asdkjf('%('&%&"
                    className="input input-bordered w-full"
                    value={signUpData.password}
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        password: e.target.value,
                      });
                    }}
                    required
                  />
                  <p>Password must be at least 6 characters long</p>
                </div>
                <br />
                {/* SIGNUP BUTTON */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />
                    <span className="text-sm leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <button className="btn btn-primary w-full" type="submit">
                Create Account
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
