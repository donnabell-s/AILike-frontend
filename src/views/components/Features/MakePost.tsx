import React, { useState } from "react";
import * as Service from "../../../services";

interface MyDetailsMiniData {
  id: number;
  profile_picture?: string;
}

const MakePost = ({ myDetails }: { myDetails: MyDetailsMiniData | null }) => {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await Service.makePost(postContent)
        console.log("Post successful");
        setPostContent(""); // Clear after submission
    } catch (error) {
        console.error("Post Failed", error)
    }
  };

  return (
    <div className="bg-white px-4 py-3 rounded-md flex items-start gap-4">
      {myDetails ? (
        <>
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
            className="bg-[#F5F5F5] flex-1 px-3 py-[2.2%] rounded-md resize-none mt-[2.2%] h-12"
            placeholder="What’s on your mind?"
            rows={1}
            style={{ minHeight: "45px", overflow: "hidden" }}
            value={postContent}
            onChange={handlePostChange}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          <button
            className="bg-[#BFA0D9] hover:bg-[#a988c4] text-white font-semibold w-21 h-10 rounded-4xl mt-3.5 cursor-pointer transition-colors"
            onClick={handlePostSubmit}
            type="button"
          >
            Post
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MakePost;
