import Navbar from "../../assets/components/navbar"; 
import Footer from "../../assets/components/footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
