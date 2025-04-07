// Example API call with authentication
const callProtectedEndpoint = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch('http://localhost:8000/auth/protected/', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};