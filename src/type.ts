export interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  condition: string;
  medicalHistory: string[];
  treatment_plan: string;
}

export interface AuthorizationRequest {
  patientId: string;
  treatmentType: string;
  doctorNotes: string;
  status: "pending" | "approved" | "denied";
}
