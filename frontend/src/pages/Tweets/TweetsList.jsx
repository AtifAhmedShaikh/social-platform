import Layout from "@/components/Layout/Layout";
import TweetCard from "@/components/Cards/TweetCard";

const TweetsList = () => {
  return (
    <div>
      <Layout>
        <div className="flex flex-col items-center py-10">
          <TweetCard/>
          <TweetCard/>
          <TweetCard/>
          <TweetCard/>
          <TweetCard/>
          <TweetCard/>
          <TweetCard/>
        </div>
      </Layout>
    </div>
  );
};

export default TweetsList;
