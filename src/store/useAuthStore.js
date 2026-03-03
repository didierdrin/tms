import { create } from 'zustand';
import { api } from '../lib/api';

const TOKEN_KEY = 'tms_token';

const useAuthStore = create((set) => ({
    user: null,
    userProfile: null,
    role: null,
    loading: true,
    error: null,

    initialize: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            set({ user: null, userProfile: null, role: null, loading: false, error: null });
            return () => {};
        }
        api('/api/auth/me')
            .then(({ user, userProfile }) => {
                set({
                    user: { id: user.id, email: user.email, uid: user.id },
                    userProfile,
                    role: user.role || userProfile?.role || 'client',
                    loading: false,
                    error: null,
                });
            })
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                set({ user: null, userProfile: null, role: null, loading: false, error: null });
            });
        return () => {};
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const data = await api('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            localStorage.setItem(TOKEN_KEY, data.token);
            set({
                user: { id: data.user.id, email: data.user.email, uid: data.user.id },
                userProfile: data.userProfile,
                role: data.user.role || data.userProfile?.role || 'client',
                loading: false,
                error: null,
            });
            return data;
        } catch (error) {
            const message = error.data?.error || error.message;
            set({ loading: false, error: message });
            throw new Error(message);
        }
    },

    register: async (email, password, additionalData = {}) => {
        set({ loading: true, error: null });
        try {
            const data = await api('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    role: additionalData.role || 'client',
                    displayName: additionalData.displayName,
                    phone: additionalData.phone,
                    company: additionalData.company,
                }),
            });
            localStorage.setItem(TOKEN_KEY, data.token);
            set({
                user: { id: data.user.id, email: data.user.email, uid: data.user.id },
                userProfile: data.userProfile ?? data.user,
                role: data.user.role || 'client',
                loading: false,
                error: null,
            });
            return data;
        } catch (error) {
            const message = error.data?.error || error.message;
            set({ loading: false, error: message });
            throw new Error(message);
        }
    },

    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        set({ user: null, userProfile: null, role: null, error: null });
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
