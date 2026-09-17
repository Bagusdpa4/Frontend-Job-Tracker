import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthGuard from "@/components/auth-guard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </AuthGuard>
  );
}
