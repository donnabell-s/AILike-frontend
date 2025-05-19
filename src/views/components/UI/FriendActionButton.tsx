import React, { useEffect, useState, useRef } from 'react';
import * as Services from '../../../services';

interface FriendActionButtonProps {
  myId: number;
  viewedId: number;
}

interface FriendRequest {
  id: number;
  from_user: { id: number };
  to_user: number;
  status: string;
}

const FriendActionButton: React.FC<FriendActionButtonProps> = ({ myId, viewedId }) => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRequests = async () => {
      const requests = await Services.getPendingRequests(); // 🔁 Make sure this returns all (pending/accepted/rejected)
      if (!requests) return;

      const relevantRequest = requests.find((req: FriendRequest) => (
        (req.from_user.id === myId && req.to_user === viewedId) ||
        (req.from_user.id === viewedId && req.to_user === myId)
      ));

      setFriendRequest(relevantRequest || null);
    };

    loadRequests();
  }, [myId, viewedId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const refreshFriendRequest = async () => {
    const requests = await Services.getPendingRequests();
    if (!requests) return;

    const relevantRequest = requests.find((req: FriendRequest) => (
      (req.from_user.id === myId && req.to_user === viewedId) ||
      (req.from_user.id === viewedId && req.to_user === myId)
    ));

    setFriendRequest(relevantRequest || null);
  };

const handleSendRequest = async () => {
  try {
    setIsLoading(true);
    console.log('Attempting to send friend request to:', viewedId); // Debug log
    
    if (!friendRequest || friendRequest.status === 'rejected') {
      const response = await Services.sendFriendRequest(viewedId);
      console.log('Request response:', response); // Debug log
      await refreshFriendRequest();
    } else {
      console.log('Request already exists and is not rejected, skipping send.');
    }
  } catch (err) {
    console.error('Error sending request:', err);
    if (err instanceof Error) {
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        // @ts-ignore
        response: err.response?.data
      });
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleCancelRequest = async () => {
    try {
      setIsLoading(true);
      if (friendRequest?.status === 'pending' && friendRequest.from_user.id === myId) {
        await Services.respondToRequest(friendRequest.id, 'rejected');
        await refreshFriendRequest();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespond = async (status: 'accepted' | 'rejected') => {
    try {
      setIsLoading(true);
      if (friendRequest) {
        await Services.respondToRequest(friendRequest.id, status);
        await refreshFriendRequest();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfriend = async () => {
    try {
      setIsLoading(true);
      if (friendRequest) {
        await Services.respondToRequest(friendRequest.id, 'rejected');
        setDropdownOpen(false);
        await refreshFriendRequest();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (myId === viewedId) return null;

  const isOutgoing = friendRequest?.from_user.id === myId;
  const status = friendRequest?.status;

  if (!friendRequest || status === 'rejected') {
    return (
      <button
        onClick={handleSendRequest}
        disabled={isLoading}
        className="bg-[#BFA0D9] text-white px-4 py-2 font-semibold rounded-full shadow"
      >
        Add Friend
      </button>
    );
  }

  if (status === 'pending') {
    if (isOutgoing) {
      return (
        <div className="flex gap-2">
          <button className="bg-gray-400 text-white px-4 py-2 font-semibold rounded-full shadow" disabled>
            Pending
          </button>
          <button
            onClick={handleCancelRequest}
            className="bg-red-500 text-white px-4 py-2 font-semibold rounded-full shadow"
            disabled={isLoading}
          >
            ❌
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleRespond('accepted')}
            className="bg-green-500 text-white px-4 py-2 font-semibold rounded-full shadow"
            disabled={isLoading}
          >
            ✅ Accept
          </button>
          <button
            onClick={() => handleRespond('rejected')}
            className="bg-red-500 text-white px-4 py-2 font-semibold rounded-full shadow"
            disabled={isLoading}
          >
            ❌ Reject
          </button>
        </div>
      );
    }
  }

  if (status === 'accepted') {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(open => !open)}
          className="bg-green-600 text-white px-4 py-2 font-semibold rounded-full shadow flex items-center gap-2"
          disabled={isLoading}
        >
          Friends ▼
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
            <button
              onClick={handleUnfriend}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              disabled={isLoading}
            >
              Unfriend
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default FriendActionButton;
