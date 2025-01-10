import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const signin = async (username, password) => {
        try{
            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            console.log("Response: ", response);
            const data = await response.json();
            setToken(data.tokens);
            setUser(data.user);
            setIsAuthenticated(true);

            return data;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
            throw error;
        }
    }

    const signout = async () => {
        try {
            await fetch('YOUR_API_GATEWAY_URL/auth/signout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token?.accessToken}`
                }
            });
        } finally {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
        }
    };

    return(
        <AuthContext.Provider value = {{
            signin,
            signout,
            isAuthenticated,
            user,
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}