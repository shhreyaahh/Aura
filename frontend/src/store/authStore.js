import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set, get) => ({
  // ========================
  // STATE
  // ========================
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  // ========================
  // SET USER (IMPORTANT)
  // ========================
  setUser: (user) => {
    set({ user });
  },

  // ========================
  // REGISTER
  // ========================
  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/register", { name, email, password });
      return { success: true, data: res.data };
    } catch (err) {
      set({ error: err.response?.data?.message || "Registration failed" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // ========================
  // LOGIN
  // ========================
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      set({
        token: res.data.token,
        user: res.data.user,
      });

      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // ========================
  // GET CURRENT USER
  // ========================
  getCurrentUser: async () => {
    const token = get().token;
    if (!token) return;

    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user });
    } catch (err) {
      // Token invalid → logout
      get().logout();
    }
  },

  // ========================
  // LOGOUT
  // ========================
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
