import Layout from "@/components/Layout/Layout";
import { TabsWrapper, TabsContent } from "../../components/ui/tabs";
import PostsFeed from "@/components/Feeds/PostsFeed";
import TweetsFeed from "@/components/Feeds/TweetsFeed";
import useDrawers from "@/hooks/useDrawers";

const UserProfile = () => {
  const { handleDrawerOpen } = useDrawers();
  const triggers = ["Tweets", "Posts", "Reel"];
  return (
    <Layout>
      <div className="w-100 text-center flex flex-col sm:items-start sm:px-5 mt-10">
        <div className="w-[95%]">
          <img
            className="w-[100%] h-56 rounded-md"
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
            alt=""
          />
          <div className="flex justify-between py-3 px-3">
            <div>
              <img
                className="w-[70px] h-[70px] rounded-[35px]"
                src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt=""
              />
              <div className="flex flex-col items-start mt-4">
                <span className="font-bold">Atif Ahmed</span>
                <span className="text-[12px] font-bold">
                  atif_ahmed_shaikh_19
                </span>
              </div>
            </div>
            <div className="flex gap-5 mr-10 font-bold">
              <div
                className="flex flex-col items-center"
                onClick={() => handleDrawerOpen("followersListDrawer")}
              >
                <span>Followers</span>
                <span className="text-sm">45k</span>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => handleDrawerOpen("followingListDrawer")}
              >
                <span>Following</span>
                <span className="text-sm">21</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Activity</span>
                <span className="text-sm">82%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:max-w-sm w-100 text-sm px-3 sm:p-2 font-bold mt-3 text-start">
          <h3 className="font-bold mb-1 sm:mb-4">Bio</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, non magnam expedita dolorum libero nihil esse
            accusamus in eveniet? Commodi maiores velit aperiam fuga sed modi,
            cupiditate possimus nemo excepturi.{" "}
          </p>
        </div>
      </div>
      {/* <FollowersListDrawer
        isDrawerOpen={isFollowersListDrawerOpen}
        handleDrawerToggle={() => setIsFollowersListDrawerOpen((prev) => !prev)}
      /> */}
      <TabsWrapper listClassName="sticky top-0 z-20 py-5" triggers={triggers}>
        <TabsContent value="Posts">
          <PostsFeed />
        </TabsContent>
        <TabsContent value="Tweets">
          <TweetsFeed />
        </TabsContent>
        <TabsContent value="Reels">
          <div>Reels Here</div>
        </TabsContent>
      </TabsWrapper>
    </Layout>
  );
};

export default UserProfile;
