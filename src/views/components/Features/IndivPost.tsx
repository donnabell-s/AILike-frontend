import React, { useState, useEffect } from "react";
import * as Services from "../../../services";
import { formatDistanceToNow } from "date-fns";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

interface UserDetail {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
}

interface IndivPostProps {
  id: number;
  authorId: number;
  content: string;
  likes: number[];
  my_id: number;
  created_at: string; // Expecting a date string
}

const IndivPost: React.FC<IndivPostProps> = ({ id, authorId, content, likes, my_id, created_at }) => {
  const [likedUsers, setLikedUsers] = useState<number[]>(likes);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const liked = likedUsers.includes(my_id);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const user = await Services.getUserDetail(authorId);
        setUserDetail(user);
        const picUrl = await Services.getProfilePictureUrl(user.id);
        setProfilePicUrl(picUrl);
      } catch (err) {
        console.error("Failed to load user or profile picture:", err);
      }
    };

    fetchUserDetail();
  }, [authorId]);

  const toggleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await Services.likePost(id);
      setLikedUsers(prev =>
        liked ? prev.filter(userId => userId !== my_id) : [...prev, my_id]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-4 mb-5 text-[#1F2937]">
      <div className="flex items-center justify-center gap-4 mb-4">
        {profilePicUrl ? (
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-13 h-13 rounded-full object-cover"
          />
        ) : (
          <div className="w-13 h-13 rounded-full bg-[#F5F5F5]" />
        )}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center text-md">
            <div className="flex items-center gap-1.5">
              <button className="font-semibold cursor-pointer hover:underline">{userDetail?.first_name} {userDetail?.last_name}</button>
              <span className="text-[#D9D9D9] text-sm">•</span>
              <p className="text-[#8E939A] text-sm">@{userDetail?.username}</p>
            </div>
            <span className="flex items-center text-[#1F2937] text-xs font-semibold">
              <span className="mr-1.5">{likedUsers.length} {likedUsers.length === 1 ? "" : ""}</span>
              {liked ? (
                <VscHeartFilled className="text-[#C53771] cursor-pointer text-xl" onClick={toggleLike} />
              ) : (
                <VscHeart className="cursor-pointer text-xl" onClick={toggleLike} />
              )}
            </span>
          </div>
          <div className="text-[#8E939A] text-xs">
            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="mb-3 text-[#1F2937] whitespace-pre-wrap text-base leading-5.5">
        {content}
      </div>
    </div>
  );
};

export default IndivPost;
