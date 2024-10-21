// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PatientProfile: React.FC = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate("/concent-form");
//   };
//   return (
//     <>
//       <div className="p-4 md:p-16 md:mx-10">
//         <div>
//           <p className="text-3xl font-bold text-bk-blue text-center">
//             {" "}
//             Patient details{" "}
//           </p>
//         </div>

//         {/* patients detail card */}
//         <div className=" p-8 rounded-2xl border shadow-lg mt-10">
//           <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
//             <div className="flex justify-start items-center gap-5">
//               <img
//                 height={80}
//                 width={80}
//                 src="/assets/dummy-profile.jpg"
//                 alt="profile"
//                 className="rounded-full border-2 border-bk-blue"
//               />
//               <div>
//                 <p className="text-xl font-semibold text-bk-blue">
//                   Disha Jadav
//                 </p>
//                 <p className="text-sm text-gray-500">Age: 22 years</p>
//               </div>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <button
//                 type="submit"
//                 className="px-6 bg-bk-blue text-white py-2 rounded-lg text-sm"
//                 onClick={handleSubmit}
//               >
//                 Request Prior Authorization
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-10 mt-10">
//             <div>
//               <p className="font-semibold">Email</p>
//               <p className="text-sm text-gray-500 font-semibold">
//                 dishajadav@gmail.com
//               </p>
//             </div>

//             <div>
//               <p className="font-semibold">Condition</p>
//               <p className="text-sm text-gray-500 font-semibold">Asthama</p>
//             </div>

//             <div>
//               <p className="font-semibold">Medical history</p>
//               <p className="text-sm text-gray-500 font-semibold">None</p>
//             </div>

//             <div>
//               <p className="font-semibold">Past treatments</p>
//               <p className="text-sm text-gray-500 font-semibold">
//                 2 major operations
//               </p>
//             </div>

//             <div>
//               <p className="font-semibold">medication history</p>
//               <p className="text-sm text-gray-500 font-semibold">
//                 2000mg peracitamol
//               </p>
//             </div>

//             <div>
//               <p className="font-semibold">Lab results</p>
//               <p className="text-sm text-gray-500 font-semibold">
//                 will do later
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PatientProfile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriorAuthForm from "./prior-auth-form";

interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  condition: string;
  medicalHistory: string[];
  treatment_plan: string;
}

const PatientProfile: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPriorAuthForm, setShowPriorAuthForm] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patients/${email}`
        );
        setPatient(response.data.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
        setError("Failed to load patient details.");
      }
    };

    if (email) fetchPatient();
  }, [email]);

  const togglePriorAuthForm = () => {
    setShowPriorAuthForm(!showPriorAuthForm);
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!patient) {
    return <p className="text-center">Loading patient details...</p>;
  }

  return (
    <div className="p-4 md:p-16 md:mx-10">
      <div>
        <p className="text-3xl font-bold text-bk-blue text-center mb-10">
          Patient Details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Details Card */}
        <div className="p-8 rounded-2xl border shadow-lg">
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-6">
            <div className="flex justify-start items-center gap-5">
              <img
                height={80}
                width={80}
                src="/assets/dummy-profile.jpg"
                alt="profile"
                className="rounded-full border-2 border-bk-blue"
              />
              <div>
                <p className="text-xl font-semibold text-bk-blue">
                  {patient.name}
                </p>
                <p className="text-sm text-gray-500">
                  Age: {patient.age} years
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                className="px-6 bg-bk-blue text-white py-2 rounded-lg text-sm"
                onClick={togglePriorAuthForm}
              >
                {showPriorAuthForm
                  ? "Hide Form"
                  : "Request Prior Authorization"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 gap-y-6">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-gray-500 font-semibold">
                {patient.email}
              </p>
            </div>

            <div>
              <p className="font-semibold">Condition</p>
              <p className="text-sm text-gray-500 font-semibold">
                {patient.condition}
              </p>
            </div>

            <div>
              <p className="font-semibold">Medical History</p>
              <p className="text-sm text-gray-500 font-semibold">
                {patient.medicalHistory.join(", ") || "None"}
              </p>
            </div>

            <div>
              <p className="font-semibold">Treatment Plan</p>
              <p className="text-sm text-gray-500 font-semibold">
                {patient.treatment_plan || "No treatment plan available"}
              </p>
            </div>
          </div>
        </div>

        {/* Prior Auth Form */}
        {showPriorAuthForm && (
          <div className="p-8 rounded-2xl border shadow-lg">
            <h2 className="text-2xl font-bold text-bk-blue mb-6">
              Prior Authorization Request
            </h2>
            <PriorAuthForm patientId={patient.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
