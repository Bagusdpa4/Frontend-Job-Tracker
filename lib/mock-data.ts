import { JobApplication } from "./types";

export const mockApplications: JobApplication[] = [
  {
    id: "1",
    company: "PT Teknologi Maju",
    position: "Frontend Developer",
    status: "interview HRD",
    appliedDate: "2026-09-01",
    notes: "Interview HR minggu depan",
  },
  {
    id: "2",
    company: "Startup Nusantara",
    position: "Fullstack Developer",
    status: "applied",
    appliedDate: "2026-09-05",
  },
  {
    id: "3",
    company: "Bank Digital Indonesia",
    position: "React Developer",
    status: "rejected",
    appliedDate: "2026-08-20",
    notes: "Kurang pengalaman fintech",
  },
  {
    id: "4",
    company: "Agensi Kreatif",
    position: "Web Developer",
    status: "offer",
    appliedDate: "2026-08-15",
    notes: "Nego gaji minggu ini",
  },
];
