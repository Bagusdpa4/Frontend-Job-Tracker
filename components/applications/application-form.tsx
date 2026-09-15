"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobApplication } from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

export default function ApplicationForm({
  initialData,
}: {
  initialData?: JobApplication;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(initialData);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      company: formData.get("company"),
      position: formData.get("position"),
      status: formData.get("status"),
      appliedDate: formData.get("appliedDate"),
      notes: formData.get("notes"),
    };

    // TODO: sambungkan ke API POST/PUT saat backend sudah siap
    console.log(isEdit ? "Update lamaran:" : "Tambah lamaran:", body);

    setTimeout(() => {
      router.push("/applications");
    }, 300);
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
          defaultValue={initialData?.appliedDate}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Catatan (opsional)
        </label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={initialData?.notes}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
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
