// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate("/home");
//   };

//   return (
//     <div className="w-full flex flex-col items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm px-8 flex flex-col items-center"
//       >
//         <div className="w-full text-left mb-2">
//           <label htmlFor="email" className="block leading-8">
//             Email
//           </label>
//           <input
//             type="text"
//             className="block w-full h-10 border rounded-lg pl-2"
//           />
//         </div>
//         <div className="w-full text-left mb-5">
//           <label htmlFor="password" className="block leading-8">
//             Password
//           </label>
//           <input
//             type="password"
//             className="block w-full h-10 border rounded-lg pl-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-bk-blue text-white py-2 rounded-lg"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define a basic Login form structure
interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Login Successful:", response.data);
      setError(null);
      navigate("/home"); // Navigate to home on success
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Try again.");
      console.error("Login Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 flex flex-col items-center"
      >
        {/* Email Field */}
        <div className="w-full text-left mb-2">
          <label htmlFor="email" className="block leading-7 text-sm">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full h-10 border rounded-lg pl-2"
            required
          />
        </div>

        {/* Password Field with Toggle Visibility */}
        <div className="w-full text-left mb-4">
          <label htmlFor="password" className="block leading-7 text-sm">
            PASSWORD
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full h-10 border rounded-lg pl-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <div className="w-full text-left mb-4 text-red-600">{error}</div>
        )}

        <button
          type="submit"
          className="w-full mt-5 bg-bk-blue text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
