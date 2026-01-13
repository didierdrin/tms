import { create } from 'zustand';
import { db } from '../lib/firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';

const useCustomerStore = create((set) => ({
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,

    // Fetch all customers
    fetchCustomers: async () => {
        set({ loading: true, error: null });
        try {
            const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const customers = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            set({ customers, loading: false });
        } catch (error) {
            console.error('Error fetching customers:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Create customer
    createCustomer: async (customerData) => {
        set({ loading: true, error: null });
        try {
            const docRef = await addDoc(collection(db, 'customers'), {
                ...customerData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            set({ loading: false });
            return docRef.id;
        } catch (error) {
            console.error('Error creating customer:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Update customer
    updateCustomer: async (customerId, updates) => {
        set({ loading: true, error: null });
        try {
            const customerRef = doc(db, 'customers', customerId);
            await updateDoc(customerRef, {
                ...updates,
                updatedAt: new Date().toISOString(),
            });

            set({ loading: false });
        } catch (error) {
            console.error('Error updating customer:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Delete customer
    deleteCustomer: async (customerId) => {
        set({ loading: true, error: null });
        try {
            await deleteDoc(doc(db, 'customers', customerId));
            set({ loading: false });
        } catch (error) {
            console.error('Error deleting customer:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Set selected customer
    setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),

    // Clear selected customer
    clearSelectedCustomer: () => set({ selectedCustomer: null }),
}));

export default useCustomerStore;
