import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import * as Services from "../../../services";
import IndivPost from "./IndivPost";

interface Post {
  id: number;
  author: {
    id: number;
  };
  content: string;
  likes: number[];
  created_at: string;
}

interface MyDetailsMiniData {
  id: number;
}

interface ListPostsProps {
  myDetails: MyDetailsMiniData | null;
}

const ListPosts = ({ myDetails }: ListPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await Services.getAllPosts();

      if (!data || !myDetails) return;

      if (location.pathname.includes("/user/home")) {
        // Show all posts
        setPosts(data);
      } else if (location.pathname.includes("/user/profile/")) {
        // Show only user's posts
        const userPosts = data.filter((post: Post) => post.author.id === myDetails.id);
        setPosts(userPosts);
      }
    };

    fetchPosts();
  }, [myDetails, location.pathname]);

  if (!myDetails) return null;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <IndivPost
            key={post.id}
            id={post.id}
            authorId={post.author.id}
            content={post.content}
            likes={post.likes}
            // my_id={myDetails.id}
            created_at={post.created_at}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">No posts to show.</div>
      )}
    </div>
  );
};

export default ListPosts;
