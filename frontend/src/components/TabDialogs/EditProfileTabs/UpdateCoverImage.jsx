import { EditIcon } from "@/components/Icons/IconConfig";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const UpdateCoverImage = () => {
  return (
    <TabsContent value="Update CoverImage">
      <div>Make sure you change the Cover Image</div>
      <div className="py-5 relative">
        <img
          className="w-24 h-24 rounded-full"
          src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
          alt=""
        />
        <Button className="px-2 py-1 text-lg text-slate" variant="outline">
          <EditIcon />
        </Button>
      </div>
      <div className="mt-5">
        <Button>Save changes</Button>
      </div>
    </TabsContent>
  );
};

export default UpdateCoverImage;
