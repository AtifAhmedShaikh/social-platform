import { Drawer, DrawerContent } from "@/components/ui/drawer";
import UsersFeed from "../Feeds/UsersFeed";
import { CloseIcon } from "../Icons/IconConfig";
import useDrawers from "@/hooks/useDrawers";

const FollowersListDrawer = () => {
  const { drawersStates, handleDrawerClose } = useDrawers();
  return (
    <Drawer open={drawersStates.followersListDrawer}>
      <DrawerContent className="overflow">
        <div className="flex justify-between px-5">
          <h3 className=" ml-5 font-bold text-sm">Followers</h3>
          <CloseIcon
            size={"25"}
            onClick={() => handleDrawerClose("followersListDrawer")}
          />
        </div>
        <div className="flex flex-col mt-5 px-2 h-[70vh] overflow-y-scroll">
          <UsersFeed />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FollowersListDrawer;
