import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/user/me", {
        credentials: "include"
      })
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext value={{ user, isAuthenticated, login, logout }}>
      {!isLoading && children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
