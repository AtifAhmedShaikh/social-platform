import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { CloseIcon } from "../Icons/IconConfig";
import UsersFeed from "../Feeds/UsersFeed";
import useDrawers from "@/hooks/useDrawers";
function LikedUsersListDrawer() {
  const { drawersStates, handleDrawerClose } = useDrawers();
  return (
    <Drawer open={drawersStates.LikedUsersListDrawer}>
      <DrawerContent className="overflow-y-scroll ">
        <div className="flex justify-between px-5">
          <h3 className=" ml-5 font-bold text-sm">Liked peoples</h3>
          <CloseIcon
            size={"25"}
            onClick={() => handleDrawerClose("LikedUsersListDrawer")}
          />
        </div>
        <div className="flex flex-col mt-5 px-2">
          <UsersFeed />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default LikedUsersListDrawer;
