import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { FaEnvelope, FaKey, FaArrowLeft, FaCircleCheck } from "react-icons/fa6";

export default function AdminForgotPassword() {
  const { requestPasswordReset } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your administrator email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address format.");
      return;
    }

    setSubmitting(true);
    try {
      const redirectUrl = typeof window !== "undefined"
        ? `${window.location.origin}/admin/reset-password`
        : "https://gulrezsarankar.info/admin/reset-password";

      const { error } = await requestPasswordReset(trimmedEmail, redirectUrl);

      // Handle severe rate-limiting or service outage errors transparently
      if (error && (error.status === 429 || error.message?.toLowerCase().includes("rate limit"))) {
        setErrorMessage("Too many reset requests. Please wait a few minutes before trying again.");
        return;
      }

      // Generic success display to prevent account enumeration
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
            <FaKey className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Reset Admin Password
        </h1>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-400">
          Enter your registered administrator email to receive a recovery link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {errorMessage && (
            <div className="mb-6 rounded-xl bg-red-950/60 border border-red-800/60 p-4 text-xs sm:text-sm text-red-200 flex items-start gap-3">
              <span className="font-bold shrink-0">Error:</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="space-y-6">
              <div className="rounded-xl bg-indigo-950/40 border border-indigo-800/50 p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <FaCircleCheck className="w-6 h-6" />
                </div>
                <h2 className="text-base font-semibold text-white mb-2">Check Your Email</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  If an account exists for this email address, a password reset link will be sent.
                </p>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  Please check your inbox and spam folder. Reset links are single-use and expire after a short period.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
                >
                  Send to a different email
                </button>
                <Link
                  to="/admin/login"
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
                >
                  Return to Admin Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Administrator Email
                </label>
                <div className="relative rounded-lg shadow-inner">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="block w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition shadow-lg shadow-indigo-600/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Reset Link...</span>
                    </div>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span>Back to Admin Login</span>
            </Link>
            <span className="text-slate-500">Secure Recovery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

