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

    const signup = async (username, email, password) => {
        try {
            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path: '/signup', httpMethod: 'POST',
                    body: JSON.stringify({ username, password, email })
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            console.log("Response: ", response);
            const data = await response.json();
            const body = JSON.parse(data.body);


            if(body.userConfirmed === false){
                setUser(body.username);
                return data;
            }

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

    const confirmCode = async (code) => {
        const username = user;
        try {
            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/signup/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path: '/signup/code', httpMethod: 'POST',
                    body: JSON.stringify({ username, code })
                })
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

    const signin = async (username, password) => {
        try{
            const response = await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path: '/signin', httpMethod: 'POST',
                    body: JSON.stringify({ username, password })
                })
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
            signup,
            confirmCode,
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