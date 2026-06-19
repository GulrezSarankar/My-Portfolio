import Navbar from "../../assets/components/navbar"; 
import Footer from "../../assets/components/footer";
export default function MainLayout({ children }) {
  return (
    <div className="app-shell flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
