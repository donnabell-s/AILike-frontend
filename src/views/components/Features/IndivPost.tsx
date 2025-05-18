import React, { useState, useEffect } from "react";
import * as Services from "../../../services";
import { formatDistanceToNow } from "date-fns";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";


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

const IndivPost: React.FC<Omit<IndivPostProps, 'my_id'>> = ({ id, authorId, content, likes, created_at }) => {
  const [likedUsers, setLikedUsers] = useState<number[]>(likes);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [myId, setMyId] = useState<number | null>(null);  // New state for current user ID

  // Determine if the post is liked by current user
  const liked = myId !== null && likedUsers.includes(myId);

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

    const fetchMyDetails = async () => {
      try {
        const currentUser = await Services.getMyDetails();
        setMyId(currentUser.id);
      } catch (err) {
        console.error("Failed to get current user details:", err);
      }
    };

    fetchUserDetail();
    fetchMyDetails();
  }, [authorId]);

  const toggleLike = async () => {
      if (isLoading || myId === null) return;  // Prevent if no current user id yet
      setIsLoading(true);

      try {
        if (liked) {
          await Services.unlikePost(id);
          setLikedUsers(prev => prev.filter(userId => userId !== myId));
        } else {
          await Services.likePost(id);
          setLikedUsers(prev => [...prev, myId]);
        }
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
              <Link
                to={`/user/profile/${userDetail?.id}`}
                className="font-semibold hover:underline"
              >
                {userDetail?.first_name} {userDetail?.last_name}
              </Link>
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
