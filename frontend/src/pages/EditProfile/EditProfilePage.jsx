import Layout from "@/components/Layout/Layout";
import { TabsWrapper } from "@/components/ui/tabs";
import UpdateAvatar from "@/components/TabDialogs/EditProfileTabs/UpdateAvatar";
import UpdateCoverImage from "@/components/TabDialogs/EditProfileTabs/UpdateCoverImage";
import ChangePassword from "@/components/TabDialogs/EditProfileTabs/ChangePassword";
import UpdateAccountDetails from "@/components/TabDialogs/EditProfileTabs/UpdateAccountDetails";
export function UpdateAccount() {
  const triggers = [
    "Update Account Details",
    "Change Password",
    "Update Avatar",
    "Update CoverImage",
  ];
  return (
    <Layout>
      <div className="flex justify-start items-center flex-col h-screen mt-1">
        <TabsWrapper listClassName={"flex sticky top-0"} triggers={triggers}>
          <UpdateAccountDetails />
          <UpdateAvatar />
          <UpdateCoverImage />
          <ChangePassword />
        </TabsWrapper>
      </div>
    </Layout>
  );
}

export default UpdateAccount;
