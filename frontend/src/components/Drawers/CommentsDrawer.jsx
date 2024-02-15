import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { CloseIcon, SendIcon } from "../Icons/IconConfig";
import CommentsFeed from "@/components/Feeds/CommentsFeed";
import useDrawers from "@/hooks/useDrawers";
function CommentsDrawer() {
  const { drawersStates, handleDrawerClose } = useDrawers();
  return (
    <Drawer open={drawersStates.commentsListDrawer}>
      <DrawerContent className="rounded-lg">
        <div className="relative overflow-y-scroll pb-20 h-[80vh]">
          <div className="flex justify-between px-5">
            <h3 className=" ml-5 font-bold text-sm">Comments</h3>
            <CloseIcon
              size={"25"}
              onClick={() => handleDrawerClose("commentsListDrawer")}
            />
          </div>
          <CommentsFeed />
        </div>
        <form
          className="absolute bottom-0 left-0 py-5 bg-gray-200 w-[100%] shadow-lg flex justify-center gap-3 px-2 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Enter comment content..."
            className="w-[85%] rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-2"
            required
          />
          <Button variant="destructive">
            <SendIcon />
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default CommentsDrawer;
