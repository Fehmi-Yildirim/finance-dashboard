import { createContext, useContext, useState } from "react";
import {
    login as loginService,
    logout as logoutService,
    getCurrentUser,
} from "../services/auth/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getCurrentUser());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const authenticatedUser = await loginService(email, password);

            setUser(authenticatedUser);

            return authenticatedUser;
        } catch (error) {
            setError(error.message);

            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated: user !== null,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthProvider."
        );
    }

    return context;
}

