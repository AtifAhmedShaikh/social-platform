import PostCard from "@/components/Cards/PostCard";

const PostsFeed = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default PostsFeed;
