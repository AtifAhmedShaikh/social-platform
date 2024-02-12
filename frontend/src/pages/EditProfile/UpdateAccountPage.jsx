import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout/Layout";
import UpdateAvatar from "./Tabs/UpdateAvatar";
import UpdateCoverImage from "./Tabs/UpdateCoverImage";
import ChangePassword from "./Tabs/ChangePassword";
import UpdateAccountDetails from "./Tabs/UpdateAccountDetails";
export function UpdateAccount() {
  return (
    <Layout>
      <div className="flex justify-start items-center flex-col h-screen mt-8">
        <Tabs defaultValue="account" className="w-auto">
          <TabsList className="flex ">
            <TabsTrigger value="account">Update Account Details</TabsTrigger>
            <TabsTrigger value="password">Change Current Password</TabsTrigger>
            <TabsTrigger value="avatar">Update Avatar</TabsTrigger>
            <TabsTrigger value="coverImage">Update CoverImage</TabsTrigger>
          </TabsList>
          <UpdateAccountDetails />
          <UpdateAvatar />
          <UpdateCoverImage />
          <ChangePassword />
        </Tabs>
      </div>
    </Layout>
  );
}

export default UpdateAccount;
