import React, { useEffect, useState } from "react";
import * as Components from "../../components";
import * as Services from "../../../services";
import { useLocation } from "react-router";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const location = useLocation();
  const [myId, setMyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyDetails = async () => {
      const me = await Services.getMyDetails();
      if (me) setMyId(me.id);
    };
    fetchMyDetails();
  }, []);

  return (
    <div className="sticky top-0 z-50 flex justify-between py-6 pl-10 pr-5 bg-[#FFFFFF]">
      <div className="flex justify-center items-center">
        <img src="/logo.svg" className="h-8" alt="Logo" />
      </div>
      <div className="flex flex-row gap-6">
        <Components.HeaderLink
          label="Home"
          selected={location.pathname === '/user/home'}
          path="/user/home"
        />
        {myId && (
          <Components.HeaderLink
            label="My Profile"
            selected={location.pathname.startsWith(`/user/profile/${myId}`)}
            path={`/user/profile/${myId}`} // Append userId
          />
        )}
      </div>
      <div className="flex flex-row gap-2">
        <Components.FriendRequest />
        <Components.Notification />
        <Components.MiscDropdown onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Header;
