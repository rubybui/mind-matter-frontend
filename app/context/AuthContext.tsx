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
};

const AuthContext = createContext<AuthContextType | null>(null);

function useProtectedRoute(user: User) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isLoginScreen = segments[0] === undefined || segments[0] === '';

    if (!user && !isLoginScreen) {
      router.replace('/');
    } else if (user && isLoginScreen) {
      router.replace('/checkin');
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  
  useProtectedRoute(user);

  const login = (token: string, userData: any) => {
    setUser({ token, userData });
  };

  const logout = () => {
    console.log(`[${Platform.OS}] Logout called`);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    token: user?.token || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 

