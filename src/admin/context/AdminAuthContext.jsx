import React, { createContext, useContext, useState, useEffect } from "react";
import { signInAdmin, signOutAdmin, getCurrentAdmin, onAuthStateChange } from "../../services/authService";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Initial session verification
    const checkAuth = async () => {
      try {
        const { admin: currentAdmin, error } = await getCurrentAdmin();
        if (isMounted) {
          if (error || !currentAdmin) {
            setAdmin(null);
          } else {
            setAdmin(currentAdmin);
          }
        }
      } catch (err) {
        if (isMounted) setAdmin(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    // Listen to token refreshes or logouts
    const subscription = onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        if (isMounted) setAdmin(null);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        getCurrentAdmin().then(({ admin: refreshedAdmin }) => {
          if (isMounted && refreshedAdmin) {
            setAdmin(refreshedAdmin);
          }
        });
      }
    });

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await signInAdmin(email, password);
    if (error) {
      return { success: false, error: error.message };
    }
    setAdmin({
      id: data.user.id,
      email: data.user.email,
      role: data.role,
    });
    return { success: true, error: null };
  };

  const logout = async () => {
    await signOutAdmin();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
