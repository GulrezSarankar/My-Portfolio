import Navbar from "../../assets/components/navbar"; 
import Footer from "../../assets/components/footer";
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient">
      <Navbar />
      <main className="flex-1 pt-20 px-6">{children}</main>
      <Footer />
    </div>
  );
}
