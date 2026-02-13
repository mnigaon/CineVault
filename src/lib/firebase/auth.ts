import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { create } from 'zustand';
import { useEffect } from 'react';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

// For now, using placeholder values. User needs to provide these.
// In a real scenario, we would ask for these or check .env
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics if supported
export let analytics: Analytics | null = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

// Zustand store for Auth State
interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthModalOpen: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setAuthModalOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    isAuthModalOpen: false,
    signInWithGoogle: async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            set({ isAuthModalOpen: false });
        } catch (error) {
            console.error('Error signing in with Google', error);
            throw error;
        }
    },
    signInWithEmail: async (email, pass) => {
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            set({ isAuthModalOpen: false });
        } catch (error) {
            console.error('Error signing in with Email', error);
            throw error;
        }
    },
    signUpWithEmail: async (email, pass, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: name });
            set({ isAuthModalOpen: false });
        } catch (error) {
            console.error('Error signing up', error);
            throw error;
        }
    },
    logout: async () => {
        try {
            await signOut(auth);
            set({ user: null });
        } catch (error) {
            console.error('Error signing out', error);
            throw error;
        }
    },
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
}));

// Hook to initialize auth listener
export const useAuthListener = () => {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [setUser, setLoading]);
};
