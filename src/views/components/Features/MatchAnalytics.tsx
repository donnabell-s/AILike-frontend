import { useEffect, useState } from "react";
import { getMyDetails, getProfilePictureUrl } from "../../../services";

type MyDetailsMiniData = {
  id: number;
  profile_picture?: string;
};

type MatchAnalyticsProps = {
  myDetails: MyDetailsMiniData; // This is the profile being viewed
};

const MatchAnalytics = ({ myDetails }: MatchAnalyticsProps) => {
  const [myProfilePic, setMyProfilePic] = useState<string | null>(null);
  const [otherProfilePic, setOtherProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const me = await getMyDetails();
      if (me?.id && myDetails?.id) {
        const [mine, theirs] = await Promise.all([
          getProfilePictureUrl(me.id),
          getProfilePictureUrl(myDetails.id),
        ]);
        setMyProfilePic(mine);
        setOtherProfilePic(theirs);
      }
    };

    fetchImages();
  }, [myDetails.id]);

  return (
    <div className="bg-white p-6 rounded-md flex flex-col items-center">
      <div>
        <span className="text-2xl text-[#C53771]">YOU MATCH</span>
      </div>
      <span className="text-4xl font-bold text-[#C53771] ">50.3%</span>
      <span className="text-md text-[#1F2937] text-center block mt-2 px-2">
          There's some potential here — could go either way
      </span>
      <div className="flex justify-center gap-7 mt-4">
        <img
          src={myProfilePic || "/default-avatar.png"}
          alt="You"
          className="w-17 h-17 rounded-full object-cover"
        />
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
