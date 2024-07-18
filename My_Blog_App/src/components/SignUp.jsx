import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // const passwordValidation = {
  //   required: "Password is required",
  //   minLength: {
  //     value: 8,
  //     message: "Password must be at least 8 characters long"
  //   },
  //   maxLength: {
  //     value: 265,
  //     message: "Password must be less than 265 characters long"
  //   },
  //   validate: {
  //     notCommon: value => !isCommonPassword(value) || "Password is too common"
  //   }
  // };

  // const isCommonPassword = (password) => {
  //   const commonPasswords = ['123456', 'password', '12345678', 'qwerty', 'abc123'];
  //   return commonPasswords.includes(password);
  // };
  return (
    <div className="flex items-center justify-content">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10
        border border-black/10`}
      >
        <div className="mb-2 flex justify-content">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up to create your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline "
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email : "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]? \w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || "Email address must be a valid addresses",
                },
              })}
            />

            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-slate-300
            transition-all duration-200 hover:shadow-lg hover:shadow-primary"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
