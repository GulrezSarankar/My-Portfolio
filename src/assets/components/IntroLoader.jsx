import { motion } from "framer-motion";

export default function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0D0D0D] px-6 text-[#F5F5F5]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
    >
      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#262626] bg-[#141414]"
        >
          <span className="font-heading text-xl font-bold tracking-tight text-[#F5F5F5]">
            GS<span className="text-[#A3E635]">.</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.25 }}
        >
          <h1 className="mt-4 font-heading text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Gulrez Sarankar
          </h1>
          <p className="mt-1 font-mono text-xs text-[#A1A1A1]">
            Software Engineer • Java Backend
          </p>
        </motion.div>

        <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-[#1A1A1A] border border-[#262626]">
          <motion.div
            className="h-full bg-[#A3E635]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
