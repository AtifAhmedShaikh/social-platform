import { TabsContent } from "@/components/ui/tabs";
import UploadContentToggle from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

const CreateTweet = () => {
  return (
    <TabsContent value="Create Tweet">
      <div className="font-bold mb-5">Create a new Tweet for users</div>
      <textarea
        type="text"
        placeholder="write content or message for your new Tweet "
        className="h-24 rounded-md px-2 resize-none w-[100%]  focus:outline-none focus:ring focus:ring-violet-300"
      />
      <div className="flex justify-between">
        <div className="w-[100%] ">
          <UploadContentToggle />
          <UploadContentToggle />
          <UploadContentToggle />
          <UploadContentToggle />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button>Create Tweet</Button>
      </div>
    </TabsContent>
  );
};

export default CreateTweet;
