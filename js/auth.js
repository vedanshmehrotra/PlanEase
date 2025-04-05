// Store token in localStorage
const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Get token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Remove token from localStorage
const removeToken = () => {
    localStorage.removeItem('token');
};

// Get user ID from token
const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    } catch (error) {
        return null;
    }
};

// Add authorization header to fetch requests
const getAuthHeaders = () => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
    console.log('Auth headers:', headers);
    return headers;
};

// Check if user is authenticated
const isAuthenticated = () => {
    const token = getToken();
    const isAuth = !!token;
    console.log('Authentication status:', isAuth ? 'authenticated' : 'not authenticated');
    return isAuth;
};

// Redirect to login if not authenticated
const requireAuth = () => {
    if (!isAuthenticated()) {
        console.log('Not authenticated, redirecting to login');
        window.location.href = 'loginpage.html';
        return false;
    }
    console.log('Authentication check passed');
    return true;
};

export {
    setToken,
    getToken,
    removeToken,
    getUserIdFromToken,
    getAuthHeaders,
    isAuthenticated,
    requireAuth
}; 