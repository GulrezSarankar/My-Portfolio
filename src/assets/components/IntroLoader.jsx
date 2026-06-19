import { motion } from "framer-motion";

export default function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, var(--bg), var(--bg-soft))",
        color: "var(--text)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.82, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl accent-bg text-3xl font-black text-white shadow-2xl"
        >
          GS
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
        >
          <h1 className="mt-6 text-3xl font-black tracking-tight text-heading md:text-4xl">
            Gulrez Sarankar
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-soft">
            Software Engineer Portfolio
          </p>
        </motion.div>

        <div className="mx-auto mt-8 h-1.5 w-64 overflow-hidden rounded-full" style={{ background: "var(--surface-muted)" }}>
          <motion.div
            className="h-full rounded-full accent-bg"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.15, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
