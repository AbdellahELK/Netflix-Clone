import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningup: false,
    isLogining: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    signup: async (credentials) => {
        set({ isSigningup: true });
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSigningup: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
            set({ isSigningup: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isLogining: true });
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLogining: false });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            set({ isLogining: false, user: null });
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/auth/checkAuth");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false });
            toast.error(error.response?.data?.message || "Checking failed!");
        }
    }
}));
