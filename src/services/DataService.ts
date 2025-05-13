const API_URL = 'http://localhost:8000/api';

export const GetNotifications = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/notifications/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch notifications:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return null;
    }
};

export const ReadNotifications = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/notifications/${id}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_read: true }),
        });

        if (!response.ok) {
            console.error('Failed to update notification:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating notification:', error);
        return null;
    }
};

export const DeleteNotifications = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/notifications/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to delete notification:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting notification:', error);
        return null;
    }
};

export const getPendingRequests = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/friends/requests/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch requests:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching requests:', error);
        return null;
    }
}

export const respondToRequest = async (id: number, status: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/friends/requests/${id}/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status }),
        });

        if (!response.ok) {
            console.error('Failed to update response status:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating response status:', error);
        return null;
    }
}