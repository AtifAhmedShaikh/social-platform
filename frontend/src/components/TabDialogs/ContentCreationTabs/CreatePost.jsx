import { TabsContent } from "@/components/ui/tabs";
import { EditIcon } from "@/components/Icons/IconConfig";
import { Input } from "@/components/ui/input";
import UploadContentToggle from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  return (
    <TabsContent value="Create Post">
      <div className="font-bold mb-5">Create a new Post for users</div>
      <Input
        type="text"
        label="Write Caption of Post"
        placeholder="Enter caption for your new post "
        error={null}
      />
      <div className="flex justify-between">
        <div className="w-[70%] ">
          <UploadContentToggle />
          <UploadContentToggle />
          <UploadContentToggle />
          <UploadContentToggle />
        </div>
        <div className="py-5 relative text-center">
          <img
            className="w-24 h-24 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
            alt=""
          />
          {/* <span className="text-sm font-bold">Attach Post Photo</span> */}
          <Button className="px-2 py-1 text-lg text-slate" variant="outline">
            <EditIcon />
          </Button>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button>Create Post</Button>
      </div>
    </TabsContent>
  );
};

export default CreatePost;
