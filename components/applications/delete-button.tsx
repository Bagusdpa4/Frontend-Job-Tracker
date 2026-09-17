"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { deleteApplication } from "@/features/applications/applicationsSlice";
import ConfirmDialog from "@/components/confirm-dialog";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleConfirmDelete() {
    setLoading(true);
    await dispatch(deleteApplication(id));
    router.push("/applications");
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="rounded-full cursor-pointer border border-rose-200 text-rose-600 px-4 py-2 text-sm font-medium hover:bg-rose-50 transition-colors"
      >
        Hapus Lamaran
      </button>

      <ConfirmDialog
        open={showConfirm}
        title="Hapus Lamaran?"
        description="Data lamaran ini akan dihapus permanen dan tidak bisa dikembalikan."
        confirmLabel="Ya, Hapus"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        loading={loading}
      />
    </>
  );
}
