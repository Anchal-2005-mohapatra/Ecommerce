import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [refreshCart, setRefreshCart] = useState(0);
    const [refreshWishlist, setRefreshWishlist] = useState(0);
     const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (userId) localStorage.setItem('userId', userId);
        else localStorage.removeItem('userId');

        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [userId, user]);

    // Logout function
    const logout = () => {
        setUserId(null);
        setUser(null);
        setSearchQuery('');
        // localStorage will also clear automatically via useEffect
    };

    return (
        <AuthContext.Provider value={{ 
            user, setUser, 
            userId, setUserId, 
            refreshCart, setRefreshCart, 
            refreshWishlist, setRefreshWishlist, 
            searchQuery, setSearchQuery,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
