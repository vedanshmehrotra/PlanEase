// Store token in localStorage
const setToken = (token) => {
    localStorage.setItem('token', token);
    console.log('Token set successfully');
};

// Get token from localStorage
const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved:', token ? 'exists' : 'not found');
    return token;
};

// Remove token from localStorage
const removeToken = () => {
    localStorage.removeItem('token');
    console.log('Token removed');
};

// Get user ID from token
const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) {
        console.log('No token found');
        return null;
    }
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('User ID from token:', payload.userId);
        return payload.userId;
    } catch (error) {
        console.error('Error parsing token:', error);
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