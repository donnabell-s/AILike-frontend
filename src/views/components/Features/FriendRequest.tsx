import { useState, useEffect, useRef } from "react";
import { FiUsers } from "react-icons/fi";
import * as Services from "../../../services";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface FriendRequestData {
  id: number;
  from_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  };
  status: string;
  timestamp: string;
  profile_picture_url?: string;
}

const FriendRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [requests, setRequests] = useState<FriendRequestData[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [myId, setMyId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchFriendRequests = async (userId: number) => {
    const data = await Services.getPendingRequests();

    const filtered = data.filter(
      (req: FriendRequestData) =>
        req.status === "pending" && req.from_user.id !== userId
    );

    const withPics = await Promise.all(
      filtered.map(async (req: FriendRequestData) => {
        const url = await Services.getProfilePictureUrl(req.from_user.id);
        return { ...req, profile_picture_url: url };
      })
    );

    setRequests(withPics);
    setPendingCount(filtered.length);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const me = await Services.getMyDetails();
      if (me?.id) {
        setMyId(me.id);
        await fetchFriendRequests(me.id);
      }
    };
    fetchInitialData();
  }, []);

  const togglePopup = async () => {
    const next = !showPopup;
    setShowPopup(next);
    if (next && myId) {
      await fetchFriendRequests(myId);
    }
  };

  const handleResponse = async (id: number, status: "accepted" | "rejected") => {
    const updated = await Services.respondToRequest(id, status);
    if (updated) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
      setPendingCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Button Wrapper (relative for badge) */}
      <div className="relative w-10 h-10">
        {/* Notification Badge */}
        {pendingCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#BFA0D9] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10 border-2 border-white font-semibold">
            {pendingCount}
          </div>
        )}

        {/* Icon Button */}
        <button
          onClick={togglePopup}
          className="w-full h-full flex items-center justify-center text-2xl focus:outline-none cursor-pointer"
        >
          <FiUsers
            className={`text-[#1F2937] hover:text-[#A17C9B] ${
              showPopup ? "text-[#A17C9B]" : ""
            }`}
          />
        </button>
      </div>

      {/* Friend Request Popup */}
      {showPopup && (
        <div className="absolute top-full mt-2 right-0 w-[350px] bg-white rounded-md pt-5 px-5 pb-5 z-50 shadow-[0_0_5px_rgba(0,0,0,0.1)] text-[#1F2937]">
          <p className="pb-2 font-semibold">Friend Requests</p>

          {requests.length ? (
            <ul className="space-y-2 max-h-96">
              {requests.map((req) => (
                <li key={req.id} className="text-sm py-2 px-2 flex flex-row gap-3 items-start">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={req.profile_picture_url || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col min-w-0 flex-grow">
                        <Link
                          to={`/user/profile/${req.from_user.id}`}
                          className="font-medium truncate max-w-[140px] inline-block overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
                        >
                          {req.from_user.first_name} {req.from_user.last_name}
                        </Link>
                        <span className="text-[#8E939A] text-xs truncate">
                          @{req.from_user.username}
                        </span>
                      </div>
                      <span className="text-xs text-[#8E939A] whitespace-nowrap truncate max-w-[80px]">
                        {formatDistanceToNow(new Date(req.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResponse(req.id, "accepted")}
                        className="bg-[#86CAA3] text-white w-20 text-xs px-2 py-1 rounded hover:bg-[#67C28E] cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleResponse(req.id, "rejected")}
                        className="bg-[#FDECEC] text-[#1F2937] w-20 text-xs px-2 py-1 rounded hover:bg-[#F3E0E0] cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center">
              <p className="text-sm text-[#8E939A]">No pending requests</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
