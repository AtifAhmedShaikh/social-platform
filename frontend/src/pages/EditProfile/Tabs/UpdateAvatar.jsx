import { MdEdit } from "react-icons/md";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";


const UpdateAvatar = () => {
  return (
    <TabsContent value="avatar">
        <div>Make sure you change the Avatar</div>
        <div className="py-5 relative">
          <img
            className="w-24 h-24 rounded-full"
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
            alt=""
          />
          <Button className="px-2 py-1 text-lg text-slate" variant="outline">
          <MdEdit />
          </Button> 
        </div>
        <div className="mt-5">
          <Button>Save changes</Button>
        </div>

    </TabsContent>
  );
};

export default UpdateAvatar;
