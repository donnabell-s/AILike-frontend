import { useEffect, useState } from "react";
import * as Services from "../../../services";

interface MyDetailsMiniData {
  id: number;
  profile_picture?: string;
}

const MakePost = () => {
  const [myDetails, setMyDetails] = useState<MyDetailsMiniData | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await Services.getMyDetails();
      if (data) {
        const profilePicUrl = await Services.getProfilePictureUrl(data.id);
        setMyDetails({
          ...data,
          profile_picture: profilePicUrl,
        });
      }
    };

    fetchDetails();
  }, []);

return (
  <div className="bg-white px-4 py-3 rounded-md flex flex-col justify-center gap-4">
    {myDetails ? (
      <div className="flex items-start gap-4">
        {myDetails.profile_picture ? (
          <img
            src={myDetails.profile_picture}
            alt="Profile"
            className="w-18 h-18 rounded-full border-4 border-white"
          />
        ) : (
          <div className="w-18 h-18 bg-gray-300 rounded-full border-4 border-white" />
        )}
        <textarea
          className="bg-[#F5F5F5] flex-1 p-3 rounded-md resize-none mt-2.5"
          placeholder="What’s on your mind?"
          rows={1} // Start with 1 row
          style={{ minHeight: '50px', overflow: 'hidden' }} // Minimum height and hide overflow
          onInput={(e) => {
            e.currentTarget.style.height = 'auto'; // Reset height
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set height to scrollHeight
          }}
        />
        <button className="bg-[#BFA0D9] text-white font-semibold w-21 h-10 rounded-4xl  mt-3.5">
          Post
        </button>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);


};

export default MakePost;
