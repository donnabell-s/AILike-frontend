import { useState, useEffect, useRef } from "react";
import { LuBell } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import * as Services from "../../../services";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Notification = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const deleteNotification = async (id: number) => {
    try {
      await Services.DeleteNotifications(id); // assume it succeeds
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const togglePopup = async () => {
    const next = !showPopup;
    setShowPopup(next);

    if (next) {
      try {
        const data = await Services.GetNotifications();
        if (data) {
          setNotifications(data);

          const unread = data.filter((n: Notification) => !n.is_read);
          if (unread.length > 0) {
            await Promise.all(
              unread.map((n: Notification) =>
                Services.ReadNotifications(n.id)
              )
            );

            setNotifications((prev) =>
              prev.map((n) => ({ ...n, is_read: true }))
            );
          }
        }
      } catch (error) {
        console.error("Failed to load or mark notifications:", error);
      }
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
      {/* Bell Icon */}
      <button
        onClick={togglePopup}
        className="w-10 h-10 flex items-center justify-center text-2xl focus:outline-none cursor-pointer"
      >
        <LuBell
          className={`text-[#1F2937] hover:text-[#A17C9B] ${
            showPopup ? "text-[#A17C9B]" : ""
          }`}
        />
      </button>

      {/* Notification Popup */}
      {showPopup && (
        <div className="absolute top-full mt-2 right-0 w-87 bg-white rounded-md pt-5 px-5 pb-5 z-50 shadow-[0_0_5px_rgba(0,0,0,0.1)] text-[#1F2937]">
          <p className="pb-2 font-semibold">Notifications</p>

          {notifications.length ? (
            <ul className="space-y-2 max-h-90 overflow-y-auto">
              {notifications.map((notif: Notification) => (
                <li
                  key={notif.id}
                  className="text-sm py-2 flex flex-col rounded-sm hover:bg-[#F6F1FA] px-2"
                >
                  <div className="flex justify-between items-center">
                    <span>{notif.message || "New notification"}</span>
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="text-xl text-[#8E939A] hover:text-[#FF0000] cursor-pointer"
                    >
                      <RxCross2 size={15} />
                    </button>
                  </div>
                  <span className="text-xs text-[#8E939A] mt-1">
                    {formatDistanceToNow(new Date(notif.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center">
              <p className="text-sm text-[#8E939A]">No notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
