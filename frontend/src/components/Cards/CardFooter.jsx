import React from "react";
import useDrawers from "@/hooks/useDrawers";
import {
  CommentIcon,
  LikeIcon,
  ShareIcon,
  DeleteIcon,
  SaveIcon,
} from "@/components/Icons/IconConfig";
import { openModal } from "@/redux/slices/ModalsToggleSlice";
import { useDispatch } from "react-redux";
const CardFooter = () => {
  const isUploadedByMe = true;
  const dispatch = useDispatch();
  const { handleDrawerOpen } = useDrawers();
  return (
    <React.Fragment>
      <div
        className="border-t pt-1 mt-3 border-gray-300"
        onClick={() => handleDrawerOpen("LikedUsersListDrawer")}
      >
        <span className="text-[11px] font-bold ml-1">
          4 users likes and 21 comments{" "}
        </span>
      </div>
      <div className="flex justify-between items-center h-auto py-2 pl-3">
        <div className="flex gap-5 text-[18px]">
          <LikeIcon className="hover:scale-x-125 transition tracking-tighter" />
          <CommentIcon
            className="hover:scale-x-110 transition tracking-tighter"
            onClick={() => handleDrawerOpen("commentsListDrawer")}
          />
          <ShareIcon
            className="hover:scale-x-110 transition tracking-tighter"
            onClick={() => handleDrawerOpen("shareDrawer")}
          />
        </div>
        <div className="flex gap-3">
          {isUploadedByMe && (
            <DeleteIcon
              className="hover:scale-x-110 transition tracking-tighter"
              onClick={() => dispatch(openModal("deleteConfirmationModal"))}
            />
          )}
          <SaveIcon className="hover:scale-x-110 transition tracking-tighter" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardFooter;
