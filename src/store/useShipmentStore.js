import { create } from 'zustand';
import { api } from '../lib/api';

const useShipmentStore = create((set, get) => ({
    shipments: [],
    loading: false,
    error: null,

    addShipment: async (shipmentData) => {
        set({ loading: true, error: null });
        try {
            const newShipment = await api('/api/shipments', {
                method: 'POST',
                body: JSON.stringify(shipmentData),
            });
            set((state) => ({
                shipments: [newShipment, ...state.shipments],
                loading: false,
            }));
            return newShipment;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    updateShipment: async (id, updates) => {
        set({ loading: true, error: null });
        try {
            const updated = await api(`/api/shipments/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updates),
            });
            set((state) => ({
                shipments: state.shipments.map((s) => (s.id === id ? { ...s, ...updated } : s)),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    deleteShipment: async (id) => {
        set({ loading: true, error: null });
        try {
            await api(`/api/shipments/${id}`, { method: 'DELETE' });
            set((state) => ({
                shipments: state.shipments.filter((s) => s.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    fetchShipments: async () => {
        set({ loading: true, error: null });
        try {
            const shipments = await api('/api/shipments');
            set({ shipments: Array.isArray(shipments) ? shipments : [], loading: false });
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useShipmentStore;
