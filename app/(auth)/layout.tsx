export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex min-h-screen">
      {/* Kiri: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-sm">{children}</div>
      </div>

      {/* Kanan: Branding panel (disembunyikan di mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800 overflow-hidden">
        {/* Dekorasi lingkaran blur, opsional */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 text-center px-10">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-white/15 backdrop-blur mb-6">
            <span className="text-7xl">💼</span>
          </div>
          <h2 className="text-3xl font-semibold text-white mb-3">JobTracker</h2>
          <p className="text-indigo-100 max-w-lg mx-auto leading-relaxed">
            Kelola dan pantau progres lamaran kerjamu dalam satu tempat, mulai
            dari apply sampai offer.
          </p>
        </div>
      </div>
    </div>
  );
}
