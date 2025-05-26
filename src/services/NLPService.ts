const API_URL = 'http://localhost:8000/api';

export const getMatchList = async (currentId: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/match/${currentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch Match List:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Match List:', error);
        return null;
    }
};
