// import React from "react";
// import { useNavigate } from "react-router-dom";
// import NavigationBar from "../Components/navigation-bar";

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate("/patient-profile");
//   };
//   return (
//     <>
//       <NavigationBar />
//       <div className="p-4 md:p-10">
//         <h1 className="text-2xl pb-10 text-bk-blue font-semibold">
//           Patient's Dashboard
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between">
//             <div className="flex flex-row justify-start gap-4">
//               <div>
//                 <img
//                   height={80}
//                   width={80}
//                   src="/assets/dummy-profile.jpg"
//                   alt="profile"
//                   className="mb-2 rounded-full border-2 border-bk-blue"
//                 />
//               </div>
//               <div>
//                 <p className="text-bk-blue font-semibold">Disha Jadav</p>
//                 <p className="text-gray-600 text-xs font-semibold">
//                   Age: 22 years
//                 </p>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="px-6 h-10 bg-bk-blue text-white py-2 rounded-full text-xs"
//               onClick={handleSubmit}
//             >
//               View Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../Components/navigation-bar";
import { Patient } from "../type"; // Assuming you have a 'Patient' interface defined.

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patients/all"
        );
        console.log("Response Data:", response.data); // Inspect the structure
        setPatients(response.data.data || []); // Use the correct key to access the array
      } catch (error: any) {
        console.error("Error fetching patients:", error);
        setError(error.response?.data?.message || "Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleViewProfile = (email: string) => {
    navigate(`/patient-profile/${email}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="p-4 md:p-10">
        <h1 className="text-2xl pb-10 text-bk-blue font-semibold">
          Patient's Dashboard
        </h1>

        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between"
              >
                <div className="flex flex-row justify-start gap-4">
                  <div>
                    <img
                      height={80}
                      width={80}
                      src="/assets/dummy-profile.jpg"
                      alt="profile"
                      className="mb-2 rounded-full border-2 border-bk-blue"
                    />
                  </div>
                  <div>
                    <p className="text-bk-blue font-semibold">{patient.name}</p>
                    <p className="text-gray-600 text-xs font-semibold">
                      Age: {patient.age} years
                    </p>
                    <p className="text-gray-500 text-xs">
                      Condition: {patient.condition}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-6 h-10 bg-bk-blue text-white py-2 rounded-full text-xs"
                  onClick={() => handleViewProfile(patient.email)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
