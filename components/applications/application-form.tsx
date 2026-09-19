"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TbWorldSearch } from "react-icons/tb";
import {
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaBook,
} from "react-icons/fa";
import { FaMapLocationDot, FaMoneyBill1Wave } from "react-icons/fa6";
import { useAppDispatch } from "@/lib/hooks";
import {
  createApplication,
  updateApplication,
} from "@/features/applications/applicationsSlice";
import { JobApplication } from "@/lib/types";
import { getTodayWIB, parseIndonesianDate } from "../date";

const SOURCE_OPTIONS = [
  "LinkedIn",
  "Email",
  "Web Perusahaan",
  "JobStreet",
  "Glints",
  "Kalibrr",
  "Deals",
  "Indeed",
];

const inputClass =
  "w-full rounded-md border cursor-pointer border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

export default function ApplicationForm({
  initialData,
}: {
  initialData?: JobApplication;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(initialData);

  const initialIsCustomSource = Boolean(
    initialData?.source && !SOURCE_OPTIONS.includes(initialData.source)
  );
  const [isCustomSource, setIsCustomSource] = useState(initialIsCustomSource);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const source = isCustomSource
      ? (formData.get("sourceCustom") as string)
      : (formData.get("source") as string);

    const body = {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      status: formData.get("status") as JobApplication["status"],
      source,
      city: formData.get("city") as string,
      salaryRange: formData.get("salaryRange") as string,
      appliedDate: formData.get("appliedDate") as string,
      notes: formData.get("notes") as string,
    };

    if (isEdit && initialData) {
      await dispatch(updateApplication({ id: initialData.id, data: body }));
    } else {
      await dispatch(createApplication(body));
    }

    router.push("/applications");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaBuilding className="text-zinc-900" />
          Nama Perusahaan{" "}
          <div className="text-red-500 text-lg font-extrabold">*</div>
        </label>
        <input
          name="company"
          required
          defaultValue={initialData?.company}
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaBriefcase className="text-zinc-900" />
          Posisi
          <div className="text-red-500 text-lg font-extrabold">*</div>
        </label>
        <input
          name="position"
          required
          defaultValue={initialData?.position}
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaCheckCircle className="text-zinc-900" />
          Status Lamaran Kerja
          <div className="text-red-500 text-lg font-extrabold">*</div>
        </label>
        <select
          name="status"
          defaultValue={initialData?.status ?? "applied"}
          className={inputClass}
        >
          <option value="applied">Applied</option>
          <option value="test">Tes/Psikotes</option>
          <option value="interview HRD">Interview HRD</option>
          <option value="interview User">Interview User</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaCalendarAlt className="text-zinc-900" />
          Tanggal Input Lamaran
          <div className="text-red-500 text-lg font-extrabold">*</div>
        </label>
        <input
          type="date"
          name="appliedDate"
          required
          max={getTodayWIB()}
          defaultValue={parseIndonesianDate(initialData?.appliedDate)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <TbWorldSearch className="text-zinc-900" />
          Sumber Lamaran
          <div className="text-red-500 text-lg font-extrabold">*</div>
        </label>
        <select
          name="source"
          defaultValue={
            initialIsCustomSource ? "Lainnya" : (initialData?.source ?? "")
          }
          onChange={(e) => setIsCustomSource(e.target.value === "Lainnya")}
          className={inputClass}
        >
          <option value="">Pilih sumber</option>
          {SOURCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
          <option value="Lainnya">Lainnya</option>
        </select>

        {isCustomSource && (
          <input
            name="sourceCustom"
            placeholder="Tulis sumber lamaran"
            defaultValue={initialIsCustomSource ? initialData?.source : ""}
            className={`${inputClass} mt-2`}
          />
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaMapLocationDot className="text-zinc-900" />
          Kota/Lokasi (opsional)
        </label>
        <input
          name="city"
          placeholder="Misal: Jakarta, Surabaya, Remote"
          defaultValue={initialData?.city}
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaMoneyBill1Wave className="text-zinc-900" />
          Kisaran Gaji (opsional)
        </label>
        <input
          name="salaryRange"
          placeholder="Misal: 8-12 juta"
          defaultValue={initialData?.salaryRange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium mb-1">
          <FaBook className="text-zinc-900" />
          Catatan (opsional)
        </label>
        <textarea
          name="notes"
          rows={4}
          defaultValue={initialData?.notes}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full cursor-pointer bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 hover:shadow-sm transition-colors disabled:opacity-50"
      >
        {loading
          ? "Menyimpan..."
          : isEdit
            ? "Simpan Perubahan"
            : "Simpan Lamaran"}
      </button>
    </form>
  );
}
