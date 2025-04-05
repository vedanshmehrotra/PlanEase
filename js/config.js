const config = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
        endpoints: {
            auth: {
                register: '/api/users/register',
                login: '/api/users/login',
                verify: '/api/auth/verify'
            },
            tasks: {
                base: '/api/tasks',
                byId: (id) => `/api/tasks/${id}`
            },
            notes: {
                base: '/api/notes',
                byId: (id) => `/api/notes/${id}`
            }
        }
    }
};

export default config; 