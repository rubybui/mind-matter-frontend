import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Platform } from 'react-native';

type User = {
  token: string;
  userData: any;
} | null;

type AuthContextType = {
  user: User;
  login: (token: string, userData: any) => void;
  logout: () => void;
  token: string | null;
  isHydrated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const PUBLIC_ROUTES = ['', 'index', 'register', 'signin', 'resetPassword'];

function useProtectedRoute(user: User, isHydrated: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const currentRoute = segments[0] || '';
    const isPublic = PUBLIC_ROUTES.includes(currentRoute);

    if (!user && !isPublic) {
      router.replace('/');
    } else if (user && isPublic) {
      router.replace('/survey');
    }
  }, [user, segments, isHydrated]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Simulate token restoration logic if needed (e.g., from AsyncStorage in the future)
    setIsHydrated(true);
  }, []);

  useProtectedRoute(user, isHydrated);

  const login = (token: string, userData: any) => {
    setUser({ token, userData });
  };

  const logout = () => {
    console.log(`[${Platform.OS}] Logout called`);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    token: user?.token || null,
    isHydrated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
