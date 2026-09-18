"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { useAppDispatch } from "@/lib/hooks";
import {
  createApplication,
  updateApplication,
} from "@/features/applications/applicationsSlice";
import { JobApplication } from "@/lib/types";
import { getTodayWIB, parseIndonesianDate } from "../date";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Perusahaan</label>
        <input
          name="company"
          required
          defaultValue={initialData?.company}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Posisi</label>
        <input
          name="position"
          required
          defaultValue={initialData?.position}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
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
        <label className="block text-sm font-medium mb-1">Tanggal Lamar</label>
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
        <label className="block text-sm font-medium mb-1">
          Sumber Lamaran (opsional)
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
        <label className="block text-sm font-medium mb-1">
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
        className="rounded-full cursor-pointer bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
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
