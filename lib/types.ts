export type ApplicationStatus =
  | "applied"
  | "test"
  | "interview HRD"
  | "interview User"
  | "offer"
  | "rejected";

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status:
    | "applied"
    | "test"
    | "interview HRD"
    | "interview User"
    | "offer"
    | "rejected";
  source?: string;
  appliedDate: string;
  notes?: string;
};
