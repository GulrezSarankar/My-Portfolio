import React from "react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AdminLogin from "./pages/AdminLogin";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminTestimonialsTab from "./tabs/AdminTestimonialsTab";
import ConfirmModal from "./components/ConfirmModal";

// Mock authService with vi.mock so Vitest can hoist it properly
vi.mock("../services/authService", () => ({
  signInAdmin: vi.fn(),
  signOutAdmin: vi.fn(),
  getCurrentAdmin: vi.fn().mockResolvedValue({ admin: null, error: null }),
  onAuthStateChange: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }),
  requestAdminPasswordReset: vi.fn().mockResolvedValue({ data: {}, error: null }),
  updateAdminPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
  getActiveSession: vi.fn().mockResolvedValue({ session: { user: { id: "test-admin" } }, error: null }),
}));

vi.mock("../services/testimonialsService", () => ({
  getAllTestimonialsAdmin: vi.fn().mockResolvedValue({
    data: [
      {
        id: "t-1",
        client_name: "Farhan Shaikh",
        designation: "Project Manager",
        company: "ISEES Technologies LLP",
        feedback: "Outstanding backend engineering command.",
        is_visible: true,
        display_order: 1,
      },
    ],
    error: null,
  }),
  createTestimonial: vi.fn().mockResolvedValue({ data: {}, error: null }),
  updateTestimonial: vi.fn().mockResolvedValue({ data: {}, error: null }),
  deleteTestimonial: vi.fn().mockResolvedValue({ data: {}, error: null }),
  toggleTestimonialVisibility: vi.fn().mockResolvedValue({ data: {}, error: null }),
  validateTestimonial: vi.fn().mockReturnValue({ valid: true, error: null }),
}));


describe("Admin Dashboard & Authentication", () => {
  test("renders AdminLogin component with email, password inputs, and Forgot Password link", async () => {
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
    expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
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

  test("AdminForgotPassword renders email form, validates input, and displays generic success message", async () => {
    await act(async () => {
      render(
        <AdminAuthProvider>
          <AdminForgotPassword />
        </AdminAuthProvider>
      );
    });

    expect(screen.getByText(/Reset Admin Password/i)).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText(/admin@example.com/i);

    // Enter valid email and submit form
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "admin@gulrezsarankar.info" } });
      fireEvent.submit(emailInput.closest("form"));
    });

    // Check generic success message preventing account enumeration
    expect(
      screen.getByText(/If an account exists for this email address, a password reset link will be sent/i)
    ).toBeInTheDocument();
  });

  test("AdminResetPassword handles new password validation and updates password", async () => {
    await act(async () => {
      render(
        <AdminAuthProvider>
          <AdminResetPassword />
        </AdminAuthProvider>
      );
    });

    expect(screen.getByText(/Set New Password/i)).toBeInTheDocument();
    const inputs = screen.getAllByPlaceholderText(/••••••••••••/i);
    expect(inputs.length).toBe(2);

    const newPasswordInput = inputs[0];
    const confirmPasswordInput = inputs[1];

    // Enter matching passwords >= 8 chars with mixed case and number
    await act(async () => {
      fireEvent.change(newPasswordInput, { target: { value: "SecureP@ssw0rd2026" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "SecureP@ssw0rd2026" } });
    });

    const updateBtn = screen.getByRole("button", { name: /Update Password/i });
    expect(updateBtn).not.toBeDisabled();

    await act(async () => {
      fireEvent.submit(updateBtn.closest("form"));
    });

    expect(screen.getByText(/Password Updated!/i)).toBeInTheDocument();
  });

  test("AdminLayout renders Testimonials navigation option", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AdminAuthProvider>
            <AdminLayout activeTab="overview" setActiveTab={vi.fn()}>
              <div>Content</div>
            </AdminLayout>
          </AdminAuthProvider>
        </BrowserRouter>
      );
    });

    expect(screen.getByRole("button", { name: /Testimonials/i })).toBeInTheDocument();
  });

  test("AdminTestimonialsTab renders management interface and modal triggers", async () => {
    await act(async () => {
      render(<AdminTestimonialsTab />);
    });

    expect(screen.getByText("Client Testimonials")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /New Testimonial/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search testimonials by client/i)
    ).toBeInTheDocument();

    // Verify fetched record appears
    expect(screen.getByText("Farhan Shaikh")).toBeInTheDocument();
    expect(screen.getByText("ISEES Technologies LLP")).toBeInTheDocument();

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /New Testimonial/i }));
    });

    expect(screen.getByText("Add Client Testimonial")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Farhan Shaikh/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter the client's verified statement/i)).toBeInTheDocument();
  });
});
