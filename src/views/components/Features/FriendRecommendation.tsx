import { useEffect, useState } from "react";
import { getMyDetails, getMatchList, getProfilePictureUrl, getUserDetail } from "../../../services";
import {Link} from "react-router-dom";

type MatchUser = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  similarity: number;
  compatibility: string;
  profile_picture?: string;
};

const FriendRecommendation = () => {
  const [matches, setMatches] = useState<MatchUser[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const me = await getMyDetails();
      if (!me?.id) return;

      const matchData = await getMatchList(me.id);
      if (!matchData?.matches) return;

      const topMatches = matchData.matches.slice(0, 5);

      const withDetails = await Promise.all(
        topMatches.map(async (match: MatchUser) => {
          const [profile_picture, userDetail] = await Promise.all([
            getProfilePictureUrl(match.user_id),
            getUserDetail(match.user_id),
          ]);

          return {
            ...match,
            first_name: userDetail?.first_name || "",
            last_name: userDetail?.last_name || "",
            profile_picture,
          };
        })
      );

      setMatches(withDetails);
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-white p-5 rounded-md">
      <span className="font-bold text-[#1F2937] block mb-4">Users You Might Like</span>

      {matches.length === 0 ? (
        <p className="text-[#8E939A]">No recommendations available.</p>
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <div key={match.user_id} className="flex items-center gap-3">
              <img
                src={match.profile_picture || "/default-avatar.png"}
                alt={match.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <Link to={`/user/profile/${match.user_id}`} className="text-md font-semibold text-[#1F2937] hover:underline">
                  {match.first_name} {match.last_name}
                </Link>
                <p className="text-sm text-[#8E939A]">@{match.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRecommendation;
