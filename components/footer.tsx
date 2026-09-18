export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-zinc-500 flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} JobTracker</p>
        <p className="text-zinc-400">Dibuat oleh Bagus Dwi Putra</p>
      </div>
    </footer>
  );
}
