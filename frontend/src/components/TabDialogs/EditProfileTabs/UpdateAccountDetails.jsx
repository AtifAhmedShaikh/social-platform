import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

const UpdateAccountDetails = () => {
  return (
    <TabsContent value="Update Account Details" className="flex flex-col items-center">
      <div className="w-max-md">
        <div className="font-bold mb-5">
          Make changes to your account here. Click save when you re done.
        </div>
        <div className="space-y-2">
          <Input
            name="username"
            type="text"
            label="Name "
            placeholder="Enter your Name "
            error={{}}
          />
          <Input
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your Username "
            error={{}}
          />
          <Input
            name="email"
            type="text"
            label="email"
            placeholder="Enter your Email "
            error={{}}
          />
          <Input
            name="bio"
            type="text"
            label="Bio"
            placeholder="Enter your Bio "
            error={{}}
          />
        </div>
        <div>
          <Button>Save changes</Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default UpdateAccountDetails;
