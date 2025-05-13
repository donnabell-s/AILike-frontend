import { useState, useEffect, useRef } from "react";
import { FiUsers } from "react-icons/fi";
import * as Services from "../../../services";
import { formatDistanceToNow } from "date-fns";

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
}

const FriendRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [requests, setRequests] = useState<FriendRequestData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopup = async () => {
    const next = !showPopup;
    setShowPopup(next);

    if (next) {
      const data = await Services.getPendingRequests();
      if (data) {
        const pending = data.filter(
          (req: FriendRequestData) => req.status === "pending"
        );
        setRequests(pending);
      }
    }
  };

  const handleResponse = async (id: number, status: "accepted" | "rejected") => {
    const updated = await Services.respondToRequest(id, status);
    if (updated) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
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
      {/* Icon */}
      <button
        onClick={togglePopup}
        className="w-10 h-10 flex items-center justify-center text-2xl focus:outline-none cursor-pointer"
      >
        <FiUsers
          className={`text-[#1F2937] hover:text-[#A17C9B] ${
            showPopup ? "text-[#A17C9B]" : ""
          }`}
        />
      </button>

      {/* Friend Request Popup */}
      {showPopup && (
        <div className="absolute top-full mt-2 right-0 w-75 bg-white rounded-md pt-5 px-5 pb-5 z-50 shadow-[0_0_5px_rgba(0,0,0,0.1)] text-[#1F2937]">
          <p className="pb-2 font-semibold">Friend Requests</p>

          {requests.length ? (
            <ul className="space-y-2 max-h-90 overflow-y-auto">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className="text-sm py-2 px-2 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row">
                            <span className="font-medium">{req.from_user.first_name}&nbsp;</span>
                            <span className="font-medium">{req.from_user.last_name}</span>
                        </div>
                        <span className=" text-[#8E939A] font-regular text-xs">@{req.from_user.username}</span>
                    </div>
                    <span className="text-xs text-[#8E939A] ml-2">
                      {formatDistanceToNow(new Date(req.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResponse(req.id, "accepted")}
                      className="bg-[#86CAA3] text-white w-20 text-xs px-2 py-1 rounded hover:bg-[#d2eedc]"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleResponse(req.id, "rejected")}
                      className="bg-[#FDECEC] text-[#1F2937] w-20 text-xs px-2 py-1 rounded hover:bg-[#fbd5d5]"
                    >
                      Delete
                    </button>
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
