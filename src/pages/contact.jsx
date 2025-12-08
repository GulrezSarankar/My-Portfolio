import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import SectionTitle from "../assets/components/Sectiontitle";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    if (!form.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length !== 0) return;

    emailjs
      .send(
        "service_j7ot56i",
        "template_e0405xa",
        form,
        "1oWtGWvdpK0HR2ufE"
      )
      .then(() => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pb-24 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-10 left-0 w-[300px] h-[300px] 
                      bg-purple-700/40 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] 
                      bg-pink-600/40 blur-[180px] rounded-full -z-10" />

      <SectionTitle title="Get In Touch" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 mt-10">

        {/* LEFT SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-10 
                     border border-white/20 shadow-[0_0_25px_rgba(150,0,255,0.25)]"
        >
          {/* Glowing Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                          from-purple-500 via-pink-500 to-cyan-500 rounded-t-xl" />

          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                         text-transparent bg-clip-text mb-6">
            Let's Connect
          </h3>

          <p className="text-gray-300 leading-relaxed mb-8">
            I’m always interested in working on new projects, ideas or opportunities.
            Feel free to reach out anytime — I’ll get back to you quickly!
          </p>

          <div className="space-y-5 text-gray-300 text-lg">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-purple-400 text-2xl" />
              <span>gulrezsarankar39@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-400 text-2xl" />
              <span>+91 8421090063</span>
            </div>

            <a
              href="https://wa.me/8421090063"
              className="flex items-center gap-4 hover:text-green-400 transition"
            >
              <FaWhatsapp className="text-green-400 text-2xl" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-4xl mt-10">
            <a
              href="https://github.com/gulrezsarankar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/gulrezsarankar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 
                     border border-white/20 shadow-[0_0_25px_rgba(255,0,200,0.25)]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Name Field */}
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white 
                           focus:outline-none focus:border-purple-500 focus:ring-2 
                           focus:ring-purple-500/40 peer transition"
                required
              />
              <label className="absolute left-4 top-4 text-gray-400 pointer-events-none 
                                transition-all peer-focus:-top-3 peer-focus:text-purple-400 
                                peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
                Full Name
              </label>
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white 
                           focus:outline-none focus:border-purple-500 focus:ring-2 
                           focus:ring-purple-500/40 peer transition"
                required
              />
              <label className="absolute left-4 top-4 text-gray-400 pointer-events-none 
                                transition-all peer-focus:-top-3 peer-focus:text-purple-400 
                                peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
                Email Address
              </label>
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white 
                           focus:outline-none focus:border-purple-500 focus:ring-2 
                           focus:ring-purple-500/40 peer transition"
                required
              />
              <label className="absolute left-4 top-4 text-gray-400 pointer-events-none 
                                transition-all peer-focus:-top-3 peer-focus:text-purple-400 
                                peer-focus:text-sm peer-valid:-top-3 peer-valid:text-sm">
                Your Message
              </label>
              {errors.message && (
                <p className="text-red-400 text-sm mt-2">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r 
                         from-purple-600 via-pink-600 to-cyan-500 text-white 
                         text-lg font-semibold shadow-lg hover:shadow-purple-600/40 transition"
            >
              Send Message ✨
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 
                     rounded-xl shadow-lg text-lg font-semibold"
        >
          ✨ Message Sent Successfully!
        </motion.div>
      )}
    </div>
  );
}
