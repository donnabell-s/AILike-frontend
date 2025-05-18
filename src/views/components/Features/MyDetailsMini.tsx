// import { useEffect, useState } from "react";
// import * as Services from "../../../services";

// interface MyDetailsMiniData {
//   id: number;
//   username: string;
//   first_name: string;
//   last_name: string;
//   post_count: number;
//   friend_count: number;
//   post_like_count: number;
//   profile_picture?: string; // To store the URL of the profile picture
//   header_picture?: string;  // To store the URL of the header picture
// }

// const MyDetailsMini = () => {
//   const [myDetails, setMyDetails] = useState<MyDetailsMiniData | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();

//       const profilePicture = (document.getElementById('profile') as HTMLInputElement)?.files?.[0] || null;
//       const headerPicture = (document.getElementById('header') as HTMLInputElement)?.files?.[0] || null;

//       const result = await Services.updateProfileImages(profilePicture, headerPicture);
//       console.log('Upload result:', result);
//   };


//     // Fetch user details along with profile and header pictures
//     useEffect(() => {
//       const fetchDetails = async () => {
//         const data = await Services.getMyDetails();
//         if (data) {
//           const profilePicUrl = await Services.getProfilePictureUrl(data.id);
//           const headerPicUrl = await Services.getHeaderPictureUrl(data.id);

//           // Add the image URLs to the user data
//           setMyDetails({
//             ...data,
//             profile_picture: profilePicUrl,
//             header_picture: headerPicUrl,
//           });
//         }
//       };

//       fetchDetails();
//     }, []);

//   return (
//     <div className="bg-white p-4">

//       <form onSubmit={handleSubmit}>
//         <input type="file" id="profile" accept="image/*" />
//         <input type="file" id="header" accept="image/*" />
//         <button type="submit">Upload</button>
//       </form>
  

//       {myDetails ? (
//         <div className="flex flex-col items-center">
//             <div className="flex flex-col items-center">
//                 {myDetails.profile_picture ? (
//                   <img src={myDetails.profile_picture} alt="Profile" className="w-32 h-32 rounded-full" />
//                 ) : (
//                   <div className="w-32 h-32 bg-gray-300 rounded-full" />
//                 )}
//                 <p>{myDetails.first_name} {myDetails.last_name}</p>
//                 <p>@{myDetails.username}</p>
//             </div>
//             <div className="flex flex-row justify-center gap-10">
//                 <div className="flex flex-col items-center">
//                     <p>{myDetails.post_count}</p>
//                     <p>Post</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <p>{myDetails.friend_count}</p>
//                     <p>Friends</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                     <p>{myDetails.post_like_count}</p>
//                     <p>Likes</p>
//                 </div>
//             </div>

//           {myDetails.header_picture && (
//             <img src={myDetails.header_picture} alt="Header" className="w-full h-48 object-cover" />
//           )}


//             <button className="bg-[#F282B0] w-full">
//                 My profile
//             </button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default MyDetailsMini;


interface MyDetailsMiniData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  post_count: number;
  friend_count: number;
  post_like_count: number;
  profile_picture?: string;
  header_picture?: string;
}

const MyDetailsMini = ({ myDetails }: { myDetails: MyDetailsMiniData | null }) => {
  return (
    <div className="bg-white p-4 rounded-md">
      {myDetails ? (
        <div className="flex flex-col items-center">
          {/* Header Image with Profile Picture */}
          {myDetails.header_picture && (
            <div className="relative w-full h-30">
              <img
                src={myDetails.header_picture}
                alt="Header"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                {myDetails.profile_picture ? (
                  <img
                    src={myDetails.profile_picture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-5 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white" />
                )}
              </div>
            </div>
          )}

          {/* User Information */}
          <p className="mt-11 text-lg font-semibold text-[#1F2937]">
            {myDetails.first_name} {myDetails.last_name}
          </p>
          <p className="text-gray-500 text-sm">@{myDetails.username}</p>

          {/* Stats Section */}
          <div className="flex flex-row justify-center gap-10 mt-2 text-[#1F2937]">
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.post_count}</p>
              <p className="text-xs text-[#8E939A]">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.friend_count}</p>
              <p className="text-xs text-[#8E939A]">Friends</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">{myDetails.post_like_count}</p>
              <p className="text-xs text-[#8E939A]">Likes</p>
            </div>
          </div>

          <button className="bg-[#F282B0] text-white text-sm font-semibold p-2 w-full mt-4 rounded-md">
            My Profile
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyDetailsMini;
