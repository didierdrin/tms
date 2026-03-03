import { create } from 'zustand';
import { api } from '../lib/api';

const useCustomerStore = create((set) => ({
    customers: [],
    loading: false,
    error: null,

    addCustomer: async (customerData) => {
        set({ loading: true, error: null });
        try {
            const newCustomer = await api('/api/customers', {
                method: 'POST',
                body: JSON.stringify(customerData),
            });
            set((state) => ({
                customers: [newCustomer, ...state.customers],
                loading: false,
            }));
            return newCustomer;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    updateCustomer: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const updated = await api(`/api/customers/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updates),
            });
            set((state) => ({
                customers: state.customers.map((c) => (c.id === id ? { ...c, ...updated } : c)),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    deleteCustomer: async (id) => {
        set({ loading: true, error: null });
        try {
            await api(`/api/customers/${id}`, { method: 'DELETE' });
            set((state) => ({
                customers: state.customers.filter((c) => c.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    fetchCustomers: async () => {
        set({ loading: true, error: null });
        try {
            const customers = await api('/api/customers');
            set({ customers: Array.isArray(customers) ? customers : [], loading: false });
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useCustomerStore;
