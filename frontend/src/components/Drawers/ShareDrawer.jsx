import { CloseIcon } from "../Icons/IconConfig";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useDrawers from "@/hooks/useDrawers";
import SocialMediaIconsList from "../Icons/SocialMediaIconsList";
function ShareDrawer() {
  const { drawersStates, handleDrawerClose } = useDrawers();
  return (
    <Drawer open={drawersStates.shareDrawer}>
      <DrawerContent className="overflow-hidden sm:h-[45vh] h-[25]">
        <div className="flex justify-between px-5">
          <h3 className=" ml-5 font-bold text-sm">Share</h3>
          <CloseIcon
            size={"25"}
            onClick={() => handleDrawerClose("shareDrawer")}
          />
        </div>
        <div className="text-center py-3">
          <Button variant="outline" className="font-bold text-sm">
            Copy Url
          </Button>
        </div>
        <div className="flex flex-wrap gap-5 justify-center sm:mt-5 px-2 border-b py-5 sm:py-10">
          <SocialMediaIconsList />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ShareDrawer;
