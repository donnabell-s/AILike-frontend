import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

interface MiscDropdownProps {
    onLogout: () => void;
}

const MiscDropdown: React.FC<MiscDropdownProps> = ({ onLogout }) => {
    const [showPopup, setShowPopup] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const togglePopup = () => {
        setShowPopup((prev) => !prev);
    };

    // Close the popup when clicking outside
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
                className="w-6 h-10 flex items-center justify-center text-2xl focus:outline-none cursor-pointer"
            >
                <BsThreeDotsVertical
                    className={`text-[#1F2937] hover:text-[#A17C9B] focus:outline-none ${showPopup ? 'text-[#A17C9B]' : ''}`}
                />
            </button>

            {/* Popup */}
            {showPopup && (
                <div className="absolute top-full mt-2 right-0 w-35 bg-white rounded-md p-3 z-50 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 text-sm text-[#1F2937] hover:text-[#A17C9B] font-semibold cursor-pointer"
                    >
                        <FiLogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MiscDropdown;
