import React, { useState } from "react";
import Login from "../Components/login";
import Register from "../Components/register";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        <div
          className="col-span-12 md:col-span-8 flex justify-end items-center h-screen rounded-br-3xl rounded-tr-3xl"
          style={{
            backgroundImage: "url(/assets/auth-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-white text-right text-2xl pr-5 font-semibold leading-10">
            Your Health, Our Priority. <br />
            {isLogin ? "Log in" : "Register"} to Manage Your Care Anytime,
            Anywhere.
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 w-full max-w-lg space-y-4 flex flex-col justify-center items-center h-screen">
          {" "}
          <div className="text-center text-bk-blue">
            <h1 className="text-2xl font-bold">
              {isLogin ? "Login" : "Register"}
            </h1>
            <p className="text-gray-500 leading-10">
              {isLogin
                ? "Please log in to your account"
                : "Create a new account"}
            </p>
          </div>
          {isLogin ? <Login /> : <Register />}
          <div className="text-center">
            <button
              type="button"
              onClick={toggleForm}
              className="text-bk-skyblue text-sm hover:text-blue-700"
            >
              {isLogin
                ? `Don't have an account? Register`
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
