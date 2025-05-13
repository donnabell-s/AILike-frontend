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

export const getMyDetails = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch my details:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching my details:', error);
        return null;
    }
}

export const updateProfileImages = async (profileFile: File | null, headerFile: File | null) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const formData = new FormData();

    if (profileFile) {
        formData.append('profile_picture', profileFile);
    }

    if (headerFile) {
        formData.append('header_picture', headerFile);
    }

    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            console.error('Failed to upload images:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading profile/header images:', error);
        return null;
    }
};


export const getProfilePictureUrl = async (userId: number): Promise<string | null> => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/users/${userId}/profile_picture/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch profile picture:', response.status);
            return null;
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        return null;
    }
};

export const getHeaderPictureUrl = async (userId: number): Promise<string | null> => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/users/${userId}/header_picture/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch header picture:', response.status);
            return null;
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching header picture:', error);
        return null;
    }
};
