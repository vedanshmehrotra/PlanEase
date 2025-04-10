// Store token in localStorage
const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Get token from storage
const getToken = () => {
    return localStorage.getItem('token');
};

// Remove token from storage
const removeToken = () => {
    localStorage.removeItem('token');
};

// Get authentication headers
const getAuthHeaders = () => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Check if user is authenticated
const isAuthenticated = () => {
    return !!getToken();
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
    getAuthHeaders,
    isAuthenticated,
    requireAuth
}; 