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
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
};
