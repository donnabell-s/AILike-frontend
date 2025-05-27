import { useEffect, useState } from "react";
import * as Components from "../../components";
import * as Services from "../../../services";
import { useLocation } from "react-router";

interface Post {
  id: number;
  author: {
    id: number;
  };
  content: string;
  likes: number[];
  created_at: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const location = useLocation();
  const segments = location.pathname.split("/");
  const userId = parseInt(segments[segments.length - 1], 10);

  useEffect(() => {
    const fetchDetails = async () => {
      const [userData, currentUser, posts] = await Promise.all([
        Services.getUserDetail(userId),
        Services.getMyDetails(),
        Services.getAllPosts(),  // <-- make sure this exists or replace with your existing posts fetch
      ]);

      if (userData) {
        const profilePicUrl = await Services.getProfilePictureUrl(userData.id);
        const headerPicUrl = await Services.getHeaderPictureUrl(userData.id);

        setUserDetails({
          ...userData,
          profile_picture: profilePicUrl,
          header_picture: headerPicUrl,
        });
      }

      if (currentUser?.id) {
        setCurrentUserId(currentUser.id);
      }

      if (posts) {
        setAllPosts(posts);
      }

      setLoading(false);
    };

    fetchDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const isOwnProfile = currentUserId === userId;

  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-full max-w-screen-xl p-4 gap-4">
        <div className="w-[55%]">
          <Components.MyDetailsMini />
        </div>
        <div className="w-full flex flex-col gap-6">
          <Components.UserDetails myDetails={userDetails} />
          <div className="h-[1px] bg-[#8E939A] rounded-full" />
          {/* Pass all posts & profileUserId */}
          <Components.ListPosts
            myDetails={userDetails}
            posts={allPosts}
            profileUserId={userId}
          />
        </div>
        <div className="w-[55%] flex flex-col gap-4">
          {!isOwnProfile && <Components.MatchAnalytics myDetails={userDetails} />}
          <Components.FriendRecommendation />
        </div>
      </div>
    </div>
  );
};

export default Profile;
