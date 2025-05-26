import React, { useEffect, useState, useRef } from 'react';
import * as Services from '../../../services';
import {
  BsFillPersonCheckFill,
  BsFillPersonPlusFill,
  BsPersonDashFill,
} from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

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
      const requests = await Services.getPendingRequests();
      if (!requests) return;

      const relevantRequest = requests.find((req: FriendRequest) =>
        (req.from_user.id === myId && req.to_user === viewedId) ||
        (req.from_user.id === viewedId && req.to_user === myId)
      );

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

    const relevantRequest = requests.find((req: FriendRequest) =>
      (req.from_user.id === myId && req.to_user === viewedId) ||
      (req.from_user.id === viewedId && req.to_user === myId)
    );

    setFriendRequest(relevantRequest || null);
  };

  const handleSendRequest = async () => {
    try {
      setIsLoading(true);
      if (!friendRequest || friendRequest.status === 'rejected') {
        await Services.sendFriendRequest(viewedId);
        await refreshFriendRequest();
      }
    } catch (err) {
      console.error(err);
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
        className="bg-[#BFA0D9] hover:bg-[#a988c4] text-white px-4 py-2 font-semibold rounded-full shadow flex flex-row items-center gap-1.5 cursor-pointer transition-colors"
      >
        <BsFillPersonPlusFill />
        Add Friend
      </button>
    );
  }

  if (status === 'pending') {
    if (isOutgoing) {
      return (
        <div className="flex gap-2">
          <button
            className="bg-[#8E939A] text-white px-4 py-2 font-semibold rounded-full shadow cursor-default"
            disabled
          >
            Pending
          </button>
          <button
            onClick={handleCancelRequest}
            disabled={isLoading}
            className="bg-[#E2656E] hover:bg-[#ca4d57] px-2 py-1 rounded-full flex items-center justify-center cursor-pointer transition-colors"
          >
            <RxCross2 className="text-white text-2xl hover:text-gray-200 transition" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleRespond('accepted')}
            className="bg-[#86CAA3] hover:bg-[#67C28E] text-white px-4 py-2 font-semibold rounded-full shadow flex flex-row gap-1.5 justify-center items-center cursor-pointer transition-colors"
            disabled={isLoading}
          >
            Confirm
          </button>
          <button
            onClick={() => handleRespond('rejected')}
            className="bg-[#E2656E] hover:bg-[#ca4d57] px-2 py-1 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            disabled={isLoading}
          >
            <RxCross2 className="text-white text-2xl hover:text-gray-200 transition" />
          </button>
        </div>
      );
    }
  }

  if (status === 'accepted') {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          className="bg-[#9FC1E5] hover:bg-[#82addb] text-white px-4 py-2 font-semibold rounded-full shadow flex items-center gap-2 cursor-pointer transition-colors"
          disabled={isLoading}
        >
          <BsFillPersonCheckFill />
          Friends
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-md z-10 flex flex-row">
            <button
              onClick={handleUnfriend}
              className="block w-full text-left px-4 py-2 text-[#1F2937] hover:bg-red-100 flex flex-row items-center justify-start gap-2 cursor-pointer transition-colors"
              disabled={isLoading}
            >
              <BsPersonDashFill size={18} />
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
