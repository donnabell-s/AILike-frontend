import { useEffect, useState } from "react";
import { getMyDetails, getProfilePictureUrl, getHeaderPictureUrl } from "../../../services"; // Adjust path if needed
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface MyDetailsMiniData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  post_count: number;
  friend_count: number;
  post_like_count: number;
}

const MyDetailsMini = () => {
  const [myDetails, setMyDetails] = useState<MyDetailsMiniData | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [headerPicUrl, setHeaderPicUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyDetails = async () => {
      const data = await getMyDetails();
      if (data) {
        setMyDetails(data);

        // Fetch images after ID is known
        const [profileUrl, headerUrl] = await Promise.all([
          getProfilePictureUrl(data.id),
          getHeaderPictureUrl(data.id),
        ]);

        setProfilePicUrl(profileUrl);
        setHeaderPicUrl(headerUrl);
      }
    };

    fetchMyDetails();
  }, []);

  const handleProfileClick = () => {
    if (myDetails) {
      navigate(`/user/profile/${myDetails.id}`);
    }
  };


  return (
    <div className="bg-white p-4 rounded-md">
      {myDetails ? (
        <div className="flex flex-col items-center">
          {headerPicUrl && (
            <div className="relative w-full h-30">
              <img
                src={headerPicUrl}
                alt="Header"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-5 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white" />
                )}
              </div>
            </div>
          )}

          <p className="mt-11 text-lg font-semibold text-[#1F2937]">
            {myDetails.first_name} {myDetails.last_name}
          </p>
          <p className="text-gray-500 text-sm">@{myDetails.username}</p>

          <div className="flex flex-row justify-center gap-10 mt-2 text-[#1F2937]">
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.post_count}</p>
              <p className="text-xs text-[#8E939A]">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.friend_count}</p>
              <p className="text-xs text-[#8E939A]">Friends</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.post_like_count}</p>
              <p className="text-xs text-[#8E939A]">Likes</p>
            </div>
          </div>

          <button onClick={handleProfileClick} className="bg-[#F282B0] hover:bg-[#e56a9f] text-white text-sm font-semibold p-2 w-full mt-4 rounded-md cursor-pointer">
            My Profile
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyDetailsMini;
