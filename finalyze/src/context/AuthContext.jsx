import {createContext, useContext, useEffect, useState} from "react";
import {CognitoJwtVerifier} from 'aws-jwt-verify';
import Cookies from 'js-cookie';

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
    const [token, setToken] = useState(() => {
        return Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Cookies.set('token', JSON.stringify(token));
    }, [token]);

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

            const data = await response.json();
            const body = JSON.parse(data.body);

            if(body.userConfirmed === false){
                console.log("User not confirmed");
                Cookies.set('username', username);
                return data;
            }
            return data;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
            throw error;
        }
    }

    const confirmCode = async (code) => {
        const username = Cookies.get('username');
        console.log("Username to confirm: ", username);
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

            const data = await response.json();
            Cookies.remove('username');
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

            const data = await response.json();
            const body = JSON.parse(data.body);
            console.log("Body: ", body);

            if(data.statusCode === 200){
                console.log("Inicio de sesión exitoso");
                setToken(body.tokens);
                setUser(body.username);
                setIsAuthenticated(true);
            }
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
            await fetch('https://rqt24i6itf.execute-api.us-east-1.amazonaws.com/dev/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xToken': token.accessToken
                },
                body: JSON.stringify({path: '/signout', httpMethod: 'POST'})
            });
        } finally {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
        }
    };

    // Token validation
    useEffect(() => {
        const validateToken = async (token) => {
            try {
                return await verifier.verify(token);
            } catch (error) {
                setLoading(false);
                return error;
            }
        };

        const initializeAuth = async () => {
            if(!token){
                setLoading(false);
                setIsAuthenticated(false);
                setUser(null);
                return null;
            }

            if (token && token.accessToken) {
                const tokenValidated = await validateToken(token.accessToken);
                if (tokenValidated && !tokenValidated.failedAssertion) {
                    setIsAuthenticated(true);
                    setUser(tokenValidated.username);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setIsAuthenticated(false);
                    setUser(null);
                    setToken(null);
                }
            }
            console.log("Token verificado: ");
        };

        initializeAuth();
    }, [token]);

    return(
        <AuthContext.Provider value = {{
            signup,
            confirmCode,
            signin,
            signout,
            isAuthenticated,
            user,
            token,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}


const verifier = CognitoJwtVerifier.create({
    userPoolId: 'us-east-1_MVkFwGenG',
    tokenUse: 'access',
    clientId: '2u81gv26p21upet4olns1m67pf',
});

