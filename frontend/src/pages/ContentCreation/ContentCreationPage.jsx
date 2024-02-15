import { TabsWrapper } from "@/components/ui/tabs";
import Layout from "@/components/Layout/Layout";
import CreatePost from "@/components/TabDialogs/ContentCreationTabs/CreatePost";
import CreateReel from "@/components/TabDialogs/ContentCreationTabs/CreateReel";
import CreateTweet from "@/components/TabDialogs/ContentCreationTabs/CreateTweet";

const ContentCreationHub = () => {
  const triggers = ["Create Post", "Create Reel", "Create Tweet"];
  return (
    <Layout>
      <div className="flex justify-start items-center flex-col h-screen mt-8">
        <TabsWrapper triggers={triggers}  tabClassName="w-[80%]" listClassName = "flex">
          <CreatePost />
          <CreateReel />
          <CreateTweet />
        </TabsWrapper>
      </div>
    </Layout>
  );
};

export default ContentCreationHub;
