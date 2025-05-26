import { useEffect, useState } from "react";
import { getMyDetails, getProfilePictureUrl, getMatchList } from "../../../services";

type MyDetailsMiniData = {
  id: number;
  profile_picture?: string;
};

type MatchAnalyticsProps = {
  myDetails: MyDetailsMiniData;
};

const getMessageFromCompatibility = (percent: number): string => {
  if (percent >= 100) return "You two are a perfect match!";
  if (percent >= 75) return "You have strong compatibility — definitely worth exploring!";
  if (percent >= 50) return "There's some potential here — could go either way!";
  if (percent >= 25) return "You have a few things in common, but it might take effort.";
  return "Opposites attract... sometimes. This one’s a wild card!";
};

const getEmojiFromCompatibility = (percent: number): string => {
  if (percent >= 100) return "🥰";
  if (percent >= 75) return "😊";
  if (percent >= 50) return "😌";
  if (percent >= 25) return "😅";
  return "🤨";
};

const MatchAnalytics = ({ myDetails }: MatchAnalyticsProps) => {
  const [myProfilePic, setMyProfilePic] = useState<string | null>(null);
  const [otherProfilePic, setOtherProfilePic] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const me = await getMyDetails();
      if (!me?.id || !myDetails?.id) return;

      const [mine, theirs] = await Promise.all([
        getProfilePictureUrl(me.id),
        getProfilePictureUrl(myDetails.id),
      ]);
      setMyProfilePic(mine);
      setOtherProfilePic(theirs);

      const matchData = await getMatchList(me.id);
      if (matchData?.matches?.length) {
        const match = matchData.matches.find((m: any) => m.user_id === myDetails.id);
        if (match) {
          setCompatibility(match.compatibility);
          const percentNum = parseInt(match.compatibility.replace("%", ""));
          setMessage(getMessageFromCompatibility(percentNum));
          setEmoji(getEmojiFromCompatibility(percentNum));
        }
      }
    };

    fetchData();
  }, [myDetails.id]);

  return (
    <div className="bg-white p-6 rounded-md flex flex-col items-center">
      <div>
        <span className="text-2xl text-[#C53771]">YOU MATCH</span>
      </div>
      <span className="text-4xl font-bold text-[#C53771]">
        {compatibility || "–"}
      </span>
      <span className="text-md text-[#1F2937] text-center block mt-2 px-2">
        {message || "Loading..."}
      </span>
      <div className="flex justify-center items-center gap-2.5 mt-4 text-3xl">
        <img
          src={myProfilePic || "/default-avatar.png"}
          alt="You"
          className="w-17 h-17 rounded-full object-cover"
        />
        <span>{emoji}</span>
        <img
          src={otherProfilePic || "/default-avatar.png"}
          alt="Them"
          className="w-17 h-17 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default MatchAnalytics;
