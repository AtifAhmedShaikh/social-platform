import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChangePassword = () => {
  return (
    <TabsContent value="Change Password" className="flex flex-col items-center">
      <div>
        <div className="font-bold mb-5">
          Make changes the current password. Click save when you done.
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <Input
              name="currentPassword"
              type="password"
              label="Current Password "
              placeholder="Enter your Current password here "
              error={{}}
            />
          </div>
          <div className="space-y-1">
            <Input
              name="newPassword"
              type="password"
              label="New Password "
              placeholder="Enter your New password here "
              error={{}}
            />
          </div>
        </div>
        <div>
          <Button>Save password</Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default ChangePassword;
