export default function Footer() {
  return (
    <footer className="mt-16 border-t px-6 py-8" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-muted md:flex-row md:text-left">
        <p>Copyright {new Date().getFullYear()} Gulrez Sarankar. All rights reserved.</p>
        <p className="font-semibold">Software Engineer · Java · Spring Boot · React</p>
      </div>
    </footer>
  );
}
