import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
    user: null,
    userProfile: null,
    role: null, // 'admin' | 'client'
    loading: true,
    error: null,

    initialize: () => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        set({
                            user: firebaseUser,
                            userProfile: userData,
                            role: userData.role || 'client',
                            loading: false,
                            error: null
                        });
                    } else {
                        // User document doesn't exist, create default client profile
                        const defaultProfile = {
                            email: firebaseUser.email,
                            role: 'client',
                            createdAt: new Date().toISOString(),
                        };

                        await setDoc(doc(db, "users", firebaseUser.uid), defaultProfile);

                        set({
                            user: firebaseUser,
                            userProfile: defaultProfile,
                            role: 'client',
                            loading: false,
                            error: null
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    set({
                        user: firebaseUser,
                        userProfile: null,
                        role: 'client',
                        loading: false,
                        error: error.message
                    });
                }
            } else {
                set({ user: null, userProfile: null, role: null, loading: false, error: null });
            }
        });
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            set({ loading: false });
            return userCredential;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    register: async (email, password, additionalData = {}) => {
        set({ loading: true, error: null });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Send email verification
            await sendEmailVerification(userCredential.user);

            // Create user profile in Firestore
            const userProfile = {
                email: email,
                role: additionalData.role || 'client',
                ...additionalData,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "users", userCredential.user.uid), userProfile);

            set({ loading: false });
            return userCredential;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            set({ user: null, userProfile: null, role: null, error: null });
        } catch (error) {
            set({ error: error.message });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
