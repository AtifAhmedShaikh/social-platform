import Layout from "@/components/Layout/Layout";
import { TabsWrapper, TabsContent } from "@/components/ui/tabs";
import TweetsFeed from "@/components/Feeds/TweetsFeed";
import PostsFeed from "@/components/Feeds/PostsFeed";
const LikedHistory = () => {
  const triggers = ["Tweets", "Posts", "Reel"];
  return (
    <Layout>
      <h2 className="text-center my-5 text-xl font-bold">
        Your Liked History of Each Items
      </h2>
      <TabsWrapper listClassName={"flex sticky top-0"} triggers={triggers}>
        <TabsContent value="Tweets">
          <TweetsFeed />
        </TabsContent>

        <TabsContent value="Posts">
          <PostsFeed />
        </TabsContent>
        <TabsContent value="Reels">
          <div>Reels Here</div>
        </TabsContent>
      </TabsWrapper>
    </Layout>
  );
};

export default LikedHistory;
