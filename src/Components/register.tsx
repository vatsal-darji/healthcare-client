// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api"; // Ensure this is your configured Axios instance
// import axios from "axios";

// const Register: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     password: "",
//     condition: "",
//     medical_history: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json", // Define the request format
//             Accept: "application/json",
//           },
//         }
//       );
//       console.log("Registration Successful:", response.data);
//       navigate("/home"); // Navigate to home page on success
//     } catch (error: any) {
//       console.error(
//         "Registration Failed:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const data = axios.get("http://localhost:5000/api/patients/all");
//   console.log(data, "DATA");

//   return (
//     <div className="w-full flex flex-col items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm px-8 flex flex-col items-center"
//       >
//         {["name", "age", "email", "condition", "medical_history"].map(
//           (field) => (
//             <div key={field} className="w-full text-left mb-2">
//               <label htmlFor={field} className="block leading-7 text-sm">
//                 {field.replace("_", " ").toUpperCase()}
//               </label>
//               <input
//                 type={field === "age" ? "number" : "text"}
//                 name={field}
//                 value={formData[field as keyof typeof formData]}
//                 onChange={handleChange}
//                 className="block w-full h-10 border rounded-lg pl-2"
//                 required
//               />
//             </div>
//           )
//         )}
//         <button
//           type="submit"
//           className="w-full mt-5 bg-bk-blue text-white py-2 rounded-lg"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the Patient interface
export interface Patient {
  id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  condition: string;
  medicalHistory: string[];
  treatment_plan: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Patient>({
    name: "",
    age: 0,
    email: "",
    password: "",
    condition: "",
    medicalHistory: [""],
    treatment_plan: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? +value : value,
    }));
  };

  const handleMedicalHistoryChange = (index: number, value: string) => {
    const updatedHistory = [...formData.medicalHistory];
    updatedHistory[index] = value;
    setFormData((prev) => ({ ...prev, medicalHistory: updatedHistory }));
  };

  const addMedicalHistoryField = () => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Registration Successful:", response.data);
      setError(null);
      navigate("/home");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 flex flex-col items-center"
      >
        {["name", "age", "email", "condition", "treatment_plan"].map(
          (field) => (
            <div key={field} className="w-full text-left mb-2">
              <label htmlFor={field} className="block leading-7 text-sm">
                {field.replace("_", " ").toUpperCase()}
              </label>
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={formData[field as keyof Patient]?.toString() || ""}
                onChange={handleChange}
                className="block w-full h-10 border rounded-lg pl-2"
                required
              />
            </div>
          )
        )}

        {/* Password Field with Toggle Visibility */}
        <div className="w-full text-left mb-2">
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

        {/* Medical History */}
        <div className="w-full text-left mb-4">
          <label className="block leading-7 text-sm">MEDICAL HISTORY</label>
          {formData.medicalHistory.map((entry, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={entry}
                onChange={(e) =>
                  handleMedicalHistoryChange(index, e.target.value)
                }
                className="block w-full h-10 border rounded-lg pl-2"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMedicalHistoryField}
            className="text-blue-500 underline mt-2"
          >
            Add More History
          </button>
        </div>

        {error && (
          <div className="w-full text-left mb-4 text-red-600">{error}</div>
        )}

        <button
          type="submit"
          className="w-full mt-5 bg-bk-blue text-white py-2 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
