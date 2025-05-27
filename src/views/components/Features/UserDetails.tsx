import React, { useEffect, useRef, useState } from 'react';
import * as Services from '../../../services';
import { BsCameraFill } from "react-icons/bs";
import { FaCakeCandles } from "react-icons/fa6";
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

const pronounOptions = ['he/him', 'she/her', 'they/them'];

const UserDetails = ({ myDetails }: { myDetails: MyDetailsMiniData | null }) => {
  const [details, setDetails] = useState<MyDetailsMiniData | null>(myDetails);
  const [editMode, setEditMode] = useState(false);
  const [myId, setMyId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<MyDetailsMiniData>>({});

  const profileInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDetails(myDetails);
    setFormData(myDetails || {});
  }, [myDetails]);

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
      if (updatedUser) {
        setDetails((prev) => ({
          ...prev!,
          profile_picture: `${updatedUser.profile_picture}?t=${new Date().getTime()}`
        }));
      }
    }
  };

  const handleHeaderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedUser = await Services.updateHeaderPicture(file);
      if (updatedUser) {
        setDetails((prev) => ({
          ...prev!,
          header_picture: `${updatedUser.header_picture}?t=${new Date().getTime()}`
        }));
      }
    }
  };

  const handleInputChange = (field: keyof MyDetailsMiniData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEditMode = async () => {
    if (editMode) {
      // Save logic
      try {
        // Call EditUser service with only editable fields
        if (!formData.username || !formData.first_name || !formData.last_name || !formData.pronouns || !formData.date_of_birth) {
          alert('Please fill in all fields before saving.');
          return;
        }

        await Services.EditUser(
          formData.username,
          formData.first_name,
          formData.last_name,
          formData.pronouns,
          formData.date_of_birth
        );

        // Update local details state with formData
        setDetails((prev) => ({
          ...prev!,
          username: formData.username!,
          first_name: formData.first_name!,
          last_name: formData.last_name!,
          pronouns: formData.pronouns!,
          date_of_birth: formData.date_of_birth!,
        }));

        alert('Profile updated successfully!');
        setEditMode(false);
      } catch (error) {
        alert('Failed to update profile.');
        console.error(error);
      }
    } else {
      setEditMode(true);
    }
  };

  const formattedDOB = formData?.date_of_birth
    ? new Date(formData.date_of_birth).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div>
      {formData ? (
        <div>
          {/* Header & Profile */}
          <div className="relative w-full h-58">
            {formData.header_picture && (
              <img
                src={formData.header_picture}
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
              {formData.profile_picture ? (
                <div className="relative w-[180px] h-[180px]">
                  <img
                    src={formData.profile_picture}
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

          {/* Stats + Button */}
          <div className="flex justify-end mt-2">
            <div className="flex flex-row justify-center gap-7 text-[#1F2937]">
              <div className="flex flex-col items-center">
                <p className="font-semibold">{formData.post_count}</p>
                <p className="text-xs text-[#8E939A]">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">{formData.friend_count}</p>
                <p className="text-xs text-[#8E939A]">Friends</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">{formData.post_like_count}</p>
                <p className="text-xs text-[#8E939A]">Likes</p>
              </div>
            </div>
            <div className='w-47 flex justify-end'>
              {isMyProfile ? (
              <button
                onClick={toggleEditMode}
                className={`${
                  editMode
                    ? 'bg-[#86CAA3] hover:bg-[#67C28E]'
                    : 'bg-[#BFA0D9] hover:bg-[#a07ec4]'
                } text-white px-4 py-2 font-semibold rounded-full shadow cursor-pointer`}
              >
                {editMode ? "Save Profile" : "Edit Profile"}
              </button>

              ) : (
                myId && formData.id && <Components.FriendActionButton myId={myId} viewedId={formData.id} />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-11 text-[#1F2937] flex flex-col gap-3">
            <div className='flex flex-col'>
              <div className='flex flex-row items-center gap-2.5'>
                {editMode ? (
                  <>
                    <input
                      value={formData.first_name || ""}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <input
                      value={formData.last_name || ""}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                  <select
                    value={pronounOptions.includes(formData.pronouns || '') ? formData.pronouns : ''}
                    onChange={(e) => handleInputChange("pronouns", e.target.value)}
                    className="px-3 py-2 border rounded text-sm text-[#1F2937] h-[29.6px] px-[8px] py-[4px]"
                  >
                    <option value="" disabled>Select pronouns</option>
                    {pronounOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold">
                      {formData.first_name} {formData.last_name}
                    </p>
                    <p className='text-[#8E939A] text-md'>{formData.pronouns}</p>
                  </>
                )}
              </div>
              {editMode ? (
                <input
                  type="text"
                  value={formData.username || ""}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="border rounded px-2 py-1 text-sm mt-1 max-w-max"
                />
              ) : (
                <p className="text-[#8E939A] text-sm">@{formData.username}</p>
              )}

            </div>
            <p className="text-md">{formData.bio}</p>
            {editMode ? (
              <input
                type="date"
                value={formData.date_of_birth || ""}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                className="border rounded px-2 py-1 text-sm mt-1 max-w-max"
              />
            ) : (
              formattedDOB && (
                <p className="text-sm flex items-center gap-1.5 text-[#8E939A] mt-1">
                  <FaCakeCandles className="text-[#BFA0D9]" /> {formattedDOB}
                </p>
              )
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
