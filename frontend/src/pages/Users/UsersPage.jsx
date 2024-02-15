import Layout from "@/components/Layout/Layout";
import UsersFeed from "@/components/Feeds/UsersFeed";
const UsersList = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-start items-center px-5">
        <div className="py-10 w-1/2">
          <UsersFeed />
        </div>
      </div>
    </Layout>
  );
};

export default UsersList;
