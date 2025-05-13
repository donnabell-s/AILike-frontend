const API_URL = 'http://localhost:8000/api';

export const GetTokens = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
  
    const data = await response.json();
    
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
}

export const RegisterUser = async (username: string, email: string, password: string, first_name: string, last_name: string, pronouns: string, date_of_birth: string) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, first_name, last_name, pronouns, date_of_birth }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    console.log('Registration successful');
}

export const ReadAccessToken = async (endpoint: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/${endpoint}/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        localStorage.removeItem('accessToken');
        return null;
    }

    return await response.json();
}

export const ReadRefreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
}

export const LogoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Logout successful');
}
