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
    where,
    onSnapshot,
    orderBy
} from 'firebase/firestore';

const useShipmentStore = create((set, get) => ({
    shipments: [],
    activeShipment: null,
    loading: false,
    error: null,
    unsubscribe: null,

    // Fetch all shipments
    fetchShipments: async (userId = null, role = null) => {
        set({ loading: true, error: null });
        try {
            let q = collection(db, 'shipments');

            // If client, only get their shipments
            if (role === 'client' && userId) {
                q = query(q, where('customerId', '==', userId));
            }

            q = query(q, orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(q);
            const shipments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            set({ shipments, loading: false });
        } catch (error) {
            console.error('Error fetching shipments:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Real-time subscription
    subscribeToShipments: (userId = null, role = null) => {
        const { unsubscribe: currentUnsub } = get();

        // Unsubscribe from previous listener
        if (currentUnsub) {
            currentUnsub();
        }

        let q = collection(db, 'shipments');

        if (role === 'client' && userId) {
            q = query(q, where('customerId', '==', userId));
        }

        q = query(q, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const shipments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            set({ shipments });
        }, (error) => {
            console.error('Error in shipments subscription:', error);
            set({ error: error.message });
        });

        set({ unsubscribe });
        return unsubscribe;
    },

    // Create shipment
    createShipment: async (shipmentData) => {
        set({ loading: true, error: null });
        try {
            const docRef = await addDoc(collection(db, 'shipments'), {
                ...shipmentData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            set({ loading: false });
            return docRef.id;
        } catch (error) {
            console.error('Error creating shipment:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Update shipment
    updateShipment: async (shipmentId, updates) => {
        set({ loading: true, error: null });
        try {
            const shipmentRef = doc(db, 'shipments', shipmentId);
            await updateDoc(shipmentRef, {
                ...updates,
                updatedAt: new Date().toISOString(),
            });

            set({ loading: false });
        } catch (error) {
            console.error('Error updating shipment:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Update location (for real-time tracking)
    updateShipmentLocation: async (shipmentId, location) => {
        try {
            const shipmentRef = doc(db, 'shipments', shipmentId);
            await updateDoc(shipmentRef, {
                currentLocation: location,
                updatedAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error updating location:', error);
            throw error;
        }
    },

    // Delete shipment
    deleteShipment: async (shipmentId) => {
        set({ loading: true, error: null });
        try {
            await deleteDoc(doc(db, 'shipments', shipmentId));
            set({ loading: false });
        } catch (error) {
            console.error('Error deleting shipment:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Set active shipment
    setActiveShipment: (shipment) => set({ activeShipment: shipment }),

    // Clear active shipment
    clearActiveShipment: () => set({ activeShipment: null }),
}));

export default useShipmentStore;
