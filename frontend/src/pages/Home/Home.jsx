import React from "react";
import PostCard from "@/components/Cards/PostCard";
import Layout from "@/components/Layout/Layout";

const Home = () => {
  return (
    <React.Fragment>
      <Layout>
        <div className="flex flex-col items-center py-10">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
