import { useEffect, useState } from "react";
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

type ListType = "all" | "user" | number;

interface ListPostsProps {
  myDetails: MyDetailsMiniData | null;
  list: ListType;
}

const ListPosts = ({ myDetails, list }: ListPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await Services.getAllPosts();
      if (data) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const filterPosts = () => {
    if (!myDetails) return [];

    if (list === "all") return posts;
    if (list === "user") return posts.filter(post => post.author.id === myDetails.id);
    if (typeof list === "number") return posts.filter(post => post.author.id === list);

    return posts;
  };

  const filteredPosts = filterPosts();

  return (
    <div>
      {myDetails ? (
        filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <IndivPost
              key={post.id}
              id={post.id}
              authorId={post.author.id}
              content={post.content}
              likes={post.likes}
              my_id={myDetails.id}
              created_at={post.created_at}
            />
          ))
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ListPosts;

