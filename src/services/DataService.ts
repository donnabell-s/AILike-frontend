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

export const sendFriendRequest = async (userId: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    console.log('Sending friend request to user ID:', userId);

    const response = await fetch(`${API_URL}/friends/requests/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to_user_id: userId }),
    });

    if (!response.ok) {
        throw new Error('Sending Friend Request Failed');
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
        }

        // return await response.json();
    } catch (error) {
        console.error('Error updating response status:', error);
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

export const getUserDetail = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/users/${id}/`, {
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


export const updateProfilePicture = async (profileFile: File) => {
    const token = localStorage.getItem('accessToken');
    if (!token || !profileFile) return null;

    const formData = new FormData();
    formData.append('profile_picture', profileFile);

    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            console.error('Failed to upload profile picture:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return null;
    }
};


export const updateHeaderPicture = async (headerFile: File) => {
    const token = localStorage.getItem('accessToken');
    if (!token || !headerFile) return null;

    const formData = new FormData();
    formData.append('header_picture', headerFile);

    try {
        const response = await fetch(`${API_URL}/user/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            console.error('Failed to upload header picture:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading header picture:', error);
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

export const getAllPosts = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/posts/`, {
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


export const makePost = async (content: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/posts/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error('Making Post Failed');
    }

    return await response.json();
}

export const likePost = async (postId: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/posts/${postId}/like/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Liking Post Failed');
    }


}

export const unlikePost = async (postId: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/posts/${postId}/like/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Unliking Post Failed');
    }
}




