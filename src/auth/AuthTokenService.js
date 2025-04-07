import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";


// hook to manange auth tokens 
export const useAuth0Token = () => {
    const{ getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [token, setToken ] = useState(null);
    const [tokenLoading, setTokenLoading ] = useState(true);
    const [tokenError, setTokenError] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated && !isLoading) {
                try {
                    setTokenLoading(true);
                    setTokenError(null);

                    const accessToken = await getAccessTokenSilently({
                        auddience: 'https://api.videogamedb.com',
                        scope: 'read:items write:items',
                    });

                    setToken(accessToken);

                    const expiresAt = new Date().getTime() + 23 * 60 * 60 * 1000;
                    localStorage.setItem('auth0TokenExpiresAt',expiresAt.toString());

                }
                catch (error) {
                    console.error('Error getting access token', error);
                    setTokenError(error);
                }
                finally{
                    setTokenLoading(false);
                }
            } 
            else if (!isLoading && isAuthenticated){
                setToken(null);
                localStorage.removeItem('auth0Token');
                localStorage.removeItem('auth0TokenExpiresAt');
            }
        };   
        getToken();
    }, [getAccessTokenSilently,isAuthenticated,isLoading]);
    return { token, tokenLoading,tokenError,isAuthenticated};
};

export const getStoredToken = () => {
    const token = localStorage.getItem('auth0Token');
    const expiresAt = localStorage.getItem('auth0TokenExpiresAt');

    if(token && expiresAt && new Date().getTime() < parseInt(expiresAt)) {
        return token;
    }

    return null;
};