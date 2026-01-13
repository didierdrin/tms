import { create } from 'zustand';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

const useShipmentStore = create((set, get) => ({
    shipments: [
        {
            id: '1',
            trackingNumber: 'TMS-2024-001',
            origin: 'Kigali',
            destination: 'Kampala',
            status: 'in-transit',
            type: 'Ocean Transport',
            weight: 500,
            shippedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            timeline: [
                { status: 'Picked up', location: 'Kigali Warehouse', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
                { status: 'In Transit', location: 'En route to Kampala', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
                { status: 'Out for Delivery', location: 'Kampala Distribution Center', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
            ]
        },
        {
            id: '2',
            trackingNumber: 'TMS-2024-002',
            origin: 'Kigali',
            destination: 'Dar es Salaam',
            status: 'delivered',
            type: 'Inland Transport',
            weight: 250,
            shippedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            expectedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            timeline: [
                { status: 'Picked up', location: 'Kigali Warehouse', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
                { status: 'Delivered', location: 'Dar es Salaam', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
            ]
        }
    ],
    loading: false,
    error: null,

    addShipment: async (shipmentData) => {
        set({ loading: true, error: null });
        try {
            const docRef = await addDoc(collection(db, 'shipments'), {
                ...shipmentData,
                createdAt: new Date().toISOString(),
                timeline: [
                    {
                        status: 'Created',
                        location: shipmentData.origin,
                        timestamp: new Date().toISOString()
                    }
                ]
            });

            const newShipment = {
                id: docRef.id,
                ...shipmentData,
                timeline: [
                    {
                        status: 'Created',
                        location: shipmentData.origin,
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            set(state => ({
                shipments: [newShipment, ...state.shipments],
                loading: false
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
            await updateDoc(doc(db, 'shipments', id), updates);

            set(state => ({
                shipments: state.shipments.map(s => s.id === id ? { ...s, ...updates } : s),
                loading: false
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    deleteShipment: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteDoc(doc(db, 'shipments', id));

            set(state => ({
                shipments: state.shipments.filter(s => s.id !== id),
                loading: false
            }));
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    fetchShipments: async (userId = null) => {
        set({ loading: true, error: null });
        try {
            let q;
            if (userId) {
                q = query(collection(db, 'shipments'), where('userId', '==', userId));
            } else {
                q = collection(db, 'shipments');
            }

            const querySnapshot = await getDocs(q);
            const shipments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            set({ shipments, loading: false });
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },

    clearError: () => set({ error: null })
}));

export default useShipmentStore;
