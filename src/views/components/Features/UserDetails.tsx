import React, { useEffect, useRef, useState } from 'react';
import * as Services from '../../../services';
import { BsCameraFill } from "react-icons/bs";
import { FaCakeCandles } from "react-icons/fa6"; // 🎂 Icon for DOB
import * as Components from "../../components";

interface MyDetailsMiniData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  pronouns: string;
  date_of_birth: string;
  bio: string;
  post_count: number;
  friend_count: number;
  post_like_count: number;
  profile_picture?: string;
  header_picture?: string;
}

const UserDetails = ({ myDetails }: { myDetails: MyDetailsMiniData | null }) => {
  const [details, setDetails] = useState(myDetails);
  const [myId, setMyId] = useState<number | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMyId = async () => {
      const me = await Services.getMyDetails();
      if (me) setMyId(me.id);
    };
    fetchMyId();
  }, []);

  const isMyProfile = myId === details?.id;

  const handleProfileClick = () => profileInputRef.current?.click();
  const handleHeaderClick = () => headerInputRef.current?.click();

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedUser = await Services.updateProfilePicture(file);
      if (updatedUser) setDetails((prev) => ({ ...prev!, profile_picture: updatedUser.profile_picture }));
    }
  };

  const handleHeaderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedUser = await Services.updateHeaderPicture(file);
      if (updatedUser) setDetails((prev) => ({ ...prev!, header_picture: updatedUser.header_picture }));
    }
  };


  const formattedDOB = details?.date_of_birth
    ? new Date(details.date_of_birth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div>
      {details ? (
        <div>
          {/* Header & Profile */}
          <div className="relative w-full h-58">
            {details.header_picture && (
              <img
                src={details.header_picture}
                alt="Header"
                className="w-full h-full object-cover rounded-md"
              />
            )}
            {isMyProfile && (
              <>
                <button
                  onClick={handleHeaderClick}
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-md text-sm shadow flex items-center gap-1 text-[#1F2937] font-semibold cursor-pointer"
                >
                  <BsCameraFill size={18} />
                  Change Header
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={headerInputRef}
                  style={{ display: 'none' }}
                  onChange={handleHeaderChange}
                />
              </>
            )}

            <div className="absolute bottom-[-80px] left-28 transform -translate-x-1/2">
              {details.profile_picture ? (
                <div className="relative w-[180px] h-[180px]">
                  <img
                    src={details.profile_picture}
                    alt="Profile"
                    className="w-full h-full rounded-full border-7 border-[#F5F5F5] object-cover"
                  />
                  {isMyProfile && (
                    <button
                      onClick={handleProfileClick}
                      className="absolute bottom-2 right-6 bg-white bg-opacity-80 p-2 rounded-full shadow text-[#8E939A] cursor-pointer"
                    >
                      <BsCameraFill size={20} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-4 h-45 bg-gray-300 rounded-full border-4 border-white" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                style={{ display: 'none' }}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* Stats + Action Button */}
          <div className="flex justify-end mt-2">
            <div className="flex flex-row justify-center gap-7 text-[#1F2937]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">{details.post_count}</p>
                <p className="text-xs text-[#8E939A]">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">{details.friend_count}</p>
                <p className="text-xs text-[#8E939A]">Friends</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">{details.post_like_count}</p>
                <p className="text-xs text-[#8E939A]">Likes</p>
              </div>
            </div>
            <div className='w-47 flex justify-end'>
            {isMyProfile ? (
              <button className="bg-[#BFA0D9] text-white px-4 py-2 font-semibold rounded-full shadow">
                Edit Profile
              </button>
            ) : (
              myId && details?.id && <Components.FriendActionButton myId={myId} viewedId={details.id} />
            )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-11 text-[#1F2937] flex flex-col gap-3">
            <div className='flex flex-col'>
              <div className='flex flex-row items-center gap-2.5'>
                <p className="text-lg font-semibold">
                {details.first_name} {details.last_name}
                </p>
                <p className='text-[#8E939A] text-md'>{details.pronouns}</p>
              </div>
            <p className="text-[#8E939A] text-sm">@{details.username}</p>
            </div>
            <p className="text-md">{details.bio}</p>
            {formattedDOB && (
              <p className="text-sm flex items-center gap-1.5 text-[#8E939A] mt-1">
                <FaCakeCandles className="text-[#BFA0D9]" /> {formattedDOB}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
