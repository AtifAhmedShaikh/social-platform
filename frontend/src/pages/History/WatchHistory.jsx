import Layout from "@/components/Layout/Layout";
import { TabsWrapper } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";

const WatchHistory = () => {
  const triggers = ["One", "Two", "Three"];
  return (
    <Layout>
      <TabsWrapper triggers={triggers}>
        <TabsContent value="One">Hello One</TabsContent>
        <TabsContent value="Two">Two Here</TabsContent>
        <TabsContent value="Three">Three has here</TabsContent>
      </TabsWrapper>
    </Layout>
  );
};

export default WatchHistory;
