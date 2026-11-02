import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AdminLogin from "./pages/AdminLogin";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ConfirmModal from "./components/ConfirmModal";

// Mock authService
jest.mock("../services/authService", () => ({
  signInAdmin: jest.fn(),
  signOutAdmin: jest.fn(),
  getCurrentAdmin: jest.fn().mockResolvedValue({ admin: null, error: null }),
  onAuthStateChange: jest.fn().mockReturnValue({ unsubscribe: jest.fn() }),
}));

describe("Admin Dashboard & Authentication", () => {
  test("renders AdminLogin component with email and password inputs", async () => {
    await act(async () => {
      render(
        <AdminAuthProvider>
          <AdminLogin />
        </AdminAuthProvider>
      );
    });

    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/admin@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In as Admin/i })).toBeInTheDocument();
  });

  test("renders ConfirmModal and fires callbacks", () => {
    const handleConfirm = jest.fn();
    const handleCancel = jest.fn();

    render(
      <ConfirmModal
        isOpen={true}
        title="Delete Test Project?"
        message="Are you sure you want to delete this test?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );

    expect(screen.getByText("Delete Test Project?")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this test?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Delete Permanently/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  test("AdminProtectedRoute blocks unauthenticated access", async () => {
    await act(async () => {
      render(
        <AdminAuthProvider>
          <AdminProtectedRoute>
            <div>Protected Content</div>
          </AdminProtectedRoute>
        </AdminAuthProvider>
      );
    });

    // Protected content should NOT be rendered when user is not admin
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
