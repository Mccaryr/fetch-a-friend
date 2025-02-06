import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import App from "../App";
import {AuthProvider} from "../auth/AuthContext.tsx";


const mockLogin = vi.fn().mockResolvedValue(undefined);
const mockUser = { name: "testUser", email: "user@example.com" };
const mockSetLoggedIn = vi.fn();
let mockLoggedIn = false;
vi.mock('../../src/auth/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin,
        loggedIn: mockLoggedIn,
        setLoggedIn: mockSetLoggedIn,
        user: mockUser
    }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div> // Mock AuthProvider
}));

describe("Login Component", () => {
    let nameInput: Node | Window, emailInput: Node | Window, submitBtn: Node | Window;

    beforeEach(() => {
        render(
            <AuthProvider>
                <App  />
            </AuthProvider>
        );
        nameInput = screen.getByLabelText(/name/i);
        emailInput = screen.getByLabelText(/email/i);
        submitBtn = screen.getByRole("button", { name: /login/i });
    });
    it("renders name and email fields", () => {
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    })

    it("displays an error message when login fails", async () => {
        fireEvent.change(nameInput, { target: { value: "Test" } });
        fireEvent.change(emailInput, { target: { value: "" } });
        fireEvent.click(submitBtn);

        const errorMessage = await screen.findByText(/email is required/i);
        expect(errorMessage).toBeInTheDocument();
    })

    it("updates loggedIn state and navigates to dashboard on successful login", async () => {
        fireEvent.change(nameInput, { target: { value: "testUser" } });
        fireEvent.change(emailInput, { target: { value: "user@example.com" }});
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                name: "testUser",
                email: "user@example.com",
            });

        });


        mockLoggedIn = true;
        mockSetLoggedIn(true);

        render(
            <AuthProvider>
                <App />
            </AuthProvider>
        );
        await waitFor(() => {
            const dashboardHeading = screen.getByText(/how it works/i);
            expect(dashboardHeading).toBeInTheDocument();
        });
    });
})