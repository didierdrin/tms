import { create } from 'zustand';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const useCustomerStore = create((set) => ({
    customers: [
        {
            id: '1',
            name: 'ABC Trading Company',
            email: 'contact@abctrading.com',
            phone: '+250 788 123 456',
            address: 'Kigali, Rwanda',
            company: 'ABC Trading',
            totalShipments: 5,
            totalSpent: 750,
            status: 'active',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: '2',
            name: 'XYZ Logistics',
            email: 'info@xyzlogistics.com',
            phone: '+250 788 654 321',
            address: 'Kampala, Uganda',
            company: 'XYZ Logistics',
            totalShipments: 3,
            totalSpent: 450,
            status: 'active',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        }
    ],
    loading: false,
    error: null,

    addCustomer: async (customerData) => {
        set({ loading: true, error: null });
        try {
            const docRef = await addDoc(collection(db, 'customers'), {
                ...customerData,
                createdAt: new Date().toISOString(),
                totalShipments: 0,
                totalSpent: 0,
                status: 'active'
            });

            const newCustomer = {
                id: docRef.id,
                ...customerData,
                createdAt: new Date().toISOString(),
                totalShipments: 0,
                totalSpent: 0,
                status: 'active'
            };

            set(state => ({
                customers: [newCustomer, ...state.customers],
                loading: false
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
            await updateDoc(doc(db, 'customers', id), updates);

            set(state => ({
                customers: state.customers.map(c => c.id === id ? { ...c, ...updates } : c),
                loading: false
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    deleteCustomer: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteDoc(doc(db, 'customers', id));

            set(state => ({
                customers: state.customers.filter(c => c.id !== id),
                loading: false
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    fetchCustomers: async () => {
        set({ loading: true, error: null });
        try {
            const querySnapshot = await getDocs(collection(db, 'customers'));
            const customers = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            set({ customers, loading: false });
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },

    clearError: () => set({ error: null })
}));

export default useCustomerStore;
