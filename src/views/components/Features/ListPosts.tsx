import { useMemo } from "react";
import { useLocation } from "react-router";
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
  posts?: Post[];
  profileUserId?: number;
}

const ListPosts = ({ myDetails, posts = [], profileUserId }: ListPostsProps) => {
  const location = useLocation();

  if (!myDetails) return null;

  const filteredPosts = useMemo(() => {
    if (location.pathname.includes("/user/profile") && profileUserId !== undefined) {
      return posts.filter((post) => post.author.id === profileUserId);
    }
    return posts;
  }, [location.pathname, posts, profileUserId]);

  return (
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <IndivPost
            key={post.id}
            id={post.id}
            authorId={post.author.id}
            content={post.content}
            likes={post.likes}
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
