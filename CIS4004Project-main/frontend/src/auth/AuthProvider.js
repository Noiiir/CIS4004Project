import React,{ createContext, useContext} from "react";
import { useAuth0Token } from "./AuthTokenService";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const {token, tokenLoading, tokenError, isAuthenticated } = useAuth0Token();

    const value = {
        token,
        tokenLoading,
        tokenError,
        isAuthenticated
    };

    return(<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

    );;
}


export const useAuth = () => {
 const context = useContext(AuthContext);
 if(!context){
    throw new Error('user Authentication most be used within an AuthProvider');
 }
 return context
};

