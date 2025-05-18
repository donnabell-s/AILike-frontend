import { useEffect, useState } from "react";
import * as Components from "../../components";
import * as Services from "../../../services";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [myDetails, setMyDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await Services.getMyDetails();
      if (data) {
        const profilePicUrl = await Services.getProfilePictureUrl(data.id);
        const headerPicUrl = await Services.getHeaderPictureUrl(data.id);

        setMyDetails({
          ...data,
          profile_picture: profilePicUrl,
          header_picture: headerPicUrl,
        });
      }
      setLoading(false);
    };

    fetchDetails();
  }, []);

    if (loading) {
    return (
        <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
    }


  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-full max-w-screen-xl p-4 gap-4">
        <div className="w-[55%]">
          <Components.MyDetailsMini/>
        </div>
        <div className="w-full flex flex-col gap-6">
          <Components.MakePost myDetails={myDetails} />
          <div className="h-[1px] bg-[#8E939A] rounded-full" />
          <Components.ListPosts myDetails={myDetails} />
        </div>
        <div className="w-[55%]">
          <Components.FriendRecommendation />
        </div>
      </div>
    </div>
  );
};

export default Home;
