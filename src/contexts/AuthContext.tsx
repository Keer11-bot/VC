import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database, googleProvider } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  userType: string | null;
  signup: (email: string, password: string, userType: string, userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (userType: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(() => {
    try {
      return localStorage.getItem('userType') || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        if (user) {
          // Fetch user type from database
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserType(userData.userType);
            try {
              localStorage.setItem('userType', userData.userType);
            } catch (error) {
              console.warn('Failed to save userType to localStorage:', error);
            }
          }
        } else {
          setUserType(null);
          try {
            localStorage.removeItem('userType');
          } catch (error) {
            console.warn('Failed to remove userType from localStorage:', error);
          }
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, userType: string, userData: any) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      await set(ref(database, `users/${user.uid}`), {
        ...userData,
        userType,
        email,
        createdAt: new Date().toISOString(),
        authProvider: 'email'
      });

      setUserType(userType);
      try {
        localStorage.setItem('userType', userType);
      } catch (error) {
        console.warn('Failed to save userType to localStorage:', error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const loginWithGoogle = async (userType: string) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        await set(userRef, {
          name: user.displayName || '',
          email: user.email || '',
          userType,
          createdAt: new Date().toISOString(),
          authProvider: 'google',
          photoURL: user.photoURL || ''
        });
      } else {
        const userData = snapshot.val();
        setUserType(userData.userType);
        try {
          localStorage.setItem('userType', userData.userType);
        } catch (error) {
          console.warn('Failed to save userType to localStorage:', error);
        }
      }

      setUserType(userType);
      try {
        localStorage.setItem('userType', userType);
      } catch (error) {
        console.warn('Failed to save userType to localStorage:', error);
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear local state immediately
      setUserType(null);
      try {
        localStorage.removeItem('userType');
      } catch (error) {
        console.warn('Failed to remove userType from localStorage:', error);
      }
      
      // Sign out from Firebase
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userType,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};