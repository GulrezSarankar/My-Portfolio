import { motion } from "framer-motion";

export default function IntroLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#080612] px-6 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      <div className="relative text-center">
        {/* Violet glow behind loader */}
        <div className="pointer-events-none absolute -top-12 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#9B5CFF]/30 blur-2xl" />

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9B5CFF] to-[#7928CA] p-[1.5px] shadow-[0_0_35px_rgba(155,92,255,0.45)]"
        >
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#080612]">
            <span className="font-heading text-2xl font-black text-white">
              GS<span className="text-[#D66BFF]">.</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Gulrez Sarankar
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#D66BFF]">
            Software Engineer &amp; Freelance Developer
          </p>
        </motion.div>

        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-[rgba(255,255,255,0.10)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#9B5CFF] to-[#D66BFF]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
