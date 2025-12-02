"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for existing session
        const checkSession = async () => {
            try {
                const storedUser = localStorage.getItem('surfarm_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Failed to restore session", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '1',
            name: 'Kai Waterman',
            email: 'kai@surfarm.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai'
        };

        setUser(mockUser);
        localStorage.setItem('surfarm_user', JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setUser(null);
        localStorage.removeItem('surfarm_user');
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
