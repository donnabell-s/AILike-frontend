import * as Components from "../../components";
import { useLocation } from "react-router";

interface HeaderProps {
  onLogout: () => void; // Declare the onLogout prop type here
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const location = useLocation();

    return (
        <div className="sticky top-0 z-50 flex justify-between py-6 pl-10 pr-5 bg-[#FFFFFF] ">
            <div className="flex justify-center items-center">
                <img src="/logo.svg" className="h-8" alt="Logo" />
            </div>
            <div className="flex flex-row gap-6">
                <Components.HeaderLink
                    label="Home"
                    selected={location.pathname === '/user/home'}
                    path="/user/home"
                />
                <Components.HeaderLink
                    label="My Profile"
                    selected={location.pathname === '/user/my-profile'}
                    path="/user/my-profile"
                />
            </div>
            <div className="flex flex-row gap-2">
                <Components.FriendRequest />
                <Components.Notification />
                <Components.MiscDropdown onLogout={onLogout} /> {/* Pass onLogout here */}
            </div>
        </div>
    );
}

export default Header;
