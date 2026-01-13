import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
    user: null,
    role: null, // 'admin' | 'client' | 'supplier'
    loading: true,

    initialize: () => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch user role from Firestore
                // For now, we simulate role or check claims. 
                // Assuming a collection 'users' exists.
                // If not found, default to client.
                try {
                    // const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    // const userData = userDoc.data();
                    // set({ user: firebaseUser, role: userData?.role || 'client', loading: false });

                    // Temporary: simple logic
                    set({ user: firebaseUser, role: 'client', loading: false });
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    set({ user: firebaseUser, role: 'client', loading: false });
                }
            } else {
                set({ user: null, role: null, loading: false });
            }
        });
    },

    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ user: null, role: null });
    }
}));

export default useAuthStore;
