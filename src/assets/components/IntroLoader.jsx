import { motion } from "framer-motion";

export default function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--bg-main)] px-6 text-[var(--text-primary)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--accent-primary)] text-2xl font-black text-white shadow-xl"
        >
          GS
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <h1 className="mt-5 text-2xl font-black tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Gulrez Sarankar
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
            Java Backend Developer
          </p>
        </motion.div>

        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-[var(--border-color)]">
          <motion.div
            className="h-full bg-[var(--accent-primary)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
