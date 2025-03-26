import React, {createContext, useContext, useState} from 'react';


type AuthContextType = {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};