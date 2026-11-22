import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import SEO from "../../assets/components/SEO";
import { onAuthStateChange, getActiveSession } from "../../services/authService";
import {
  FaLock,
  FaShieldHalved,
  FaEye,
  FaEyeSlash,
  FaCircleCheck,
  FaTriangleExclamation,
  FaArrowLeft,
} from "react-icons/fa6";

export default function AdminResetPassword() {
  const { updatePassword, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [verifyingSession, setVerifyingSession] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Password validation rules
  const isLengthValid = newPassword.length >= 8;
  const hasMixedCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumberOrSymbol = /[\d\W]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  useEffect(() => {
    let isMounted = true;

    // Check for recovery indicators in URL or active session
    const checkSession = async () => {
      try {
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        const search = typeof window !== "undefined" ? window.location.search : "";
        const isRecoveryUrl =
          hash.includes("type=recovery") ||
          hash.includes("access_token") ||
          search.includes("code=");

        const { session } = await getActiveSession();
        if (isMounted) {
          if (session || isRecoveryUrl) {
            setHasValidSession(true);
          } else {
            setHasValidSession(false);
          }
        }
      } catch (_) {
        if (isMounted) setHasValidSession(false);
      } finally {
        if (isMounted) setVerifyingSession(false);
      }
    };

    checkSession();

    // Listen for PASSWORD_RECOVERY or SIGNED_IN event from Supabase
    const subscription = onAuthStateChange((event, session) => {
      if (isMounted) {
        if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
          setHasValidSession(true);
          setVerifyingSession(false);
        }
      }
    });

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isLengthValid) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match. Please verify both fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await updatePassword(newPassword);
      if (error) {
        setErrorMessage(error.message || "Failed to update password. Please try again.");
        return;
      }

      setSuccess(true);

      // Sign out recovery session and redirect to Admin Login
      setTimeout(async () => {
        try {
          await logout();
        } catch (_) {}
        navigate("/admin/login", { replace: true });
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred while updating your password.");
    } finally {
      setSubmitting(false);
    }
  };

  if (verifyingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">
          Verifying password recovery session...
        </p>
      </div>
    );
  }

  if (!hasValidSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <FaTriangleExclamation className="w-7 h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Invalid or Expired Link
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              This password reset link is invalid, expired, or has already been used. Password recovery links are single-use and time-limited.
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/forgot-password"
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
              >
                Request New Reset Link
              </Link>
              <Link
                to="/admin/login"
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
              >
                Back to Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <SEO
        title="Admin Password Reset | Gulrez Sarankar"
        description="Restricted administrative password update."
        canonicalPath="/admin/reset-password"
        noindex
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
            <FaShieldHalved className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Set New Password
        </h1>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-400">
          Create a strong, secure password for your administrator account
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

          {success ? (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <FaCircleCheck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-2">Password Updated!</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your administrator password has been successfully updated. Redirecting you to the Admin Login page...
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await logout();
                    } catch (_) {}
                    navigate("/admin/login", { replace: true });
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
                >
                  Go to Login Now
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  New Password
                </label>
                <div className="relative rounded-lg shadow-inner">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaLock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-11 py-2.5 rounded-lg bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative rounded-lg shadow-inner">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FaLock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-11 py-2.5 rounded-lg bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password strength indicators */}
              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 text-xs space-y-1.5">
                <div className="font-medium text-slate-400 mb-1">Password Requirements:</div>
                <div className={`flex items-center gap-2 ${isLengthValid ? "text-emerald-400" : "text-slate-500"}`}>
                  <span>{isLengthValid ? "✓" : "○"}</span>
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${hasMixedCase ? "text-emerald-400" : "text-slate-500"}`}>
                  <span>{hasMixedCase ? "✓" : "○"}</span>
                  <span>Upper & lower case letters</span>
                </div>
                <div className={`flex items-center gap-2 ${hasNumberOrSymbol ? "text-emerald-400" : "text-slate-500"}`}>
                  <span>{hasNumberOrSymbol ? "✓" : "○"}</span>
                  <span>At least one number or symbol</span>
                </div>
                {confirmPassword && (
                  <div className={`flex items-center gap-2 ${passwordsMatch ? "text-emerald-400" : "text-amber-400"}`}>
                    <span>{passwordsMatch ? "✓" : "✕"}</span>
                    <span>{passwordsMatch ? "Passwords match" : "Passwords do not match"}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || !isLengthValid || !passwordsMatch}
                  className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    <span>Update Password</span>
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
            <span className="text-slate-500">Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

