import { useState } from "react";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import LikedUsersListDrawer from "@/components/Drawers/LikedUsersListDrawer";
import CommentsDrawer from "@/components/Drawers/CommentsDrawer";
import ShareDrawer from "../Drawers/ShareDrawer";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const TweetCard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLikedDrawerOpen, setIsLikedDrawerOpen] = useState(false);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);

  const handleDeleteConfirmed = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="border rounded-md p-2 lg:w-1/2 md:w-1/3 sm:w-[25%] h-auto shadow-md mb-5 hover:bg-gray-100 sm:hover:scale-95 hover:shadow-lg">
      {/* <div className="h-[15%] border-b sm:pb-3 sm:mb-3 flex items-center justify-between px-3">
        <div className="flex">
          <img
            className="h-[40px]  w-[40px] rounded-[20px] "
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
          />
          <div className="flex flex-col px-3">
            <span className="text-[15px]">
              Atif Ahmed Shaikh{" "}
              <span className="ml-3 text-[11px] font-bold text-gray-700">
                1h ago
              </span>{" "}
            </span>
            <span className="text-[12px]">atif_ahmed_shaikh_19</span>
          </div>
        </div>
        <Button variant="primary" size="md">
          Follow
        </Button>
      </div> */}
      <CardHeader />
      <LikedUsersListDrawer
        isDrawerOpen={isLikedDrawerOpen}
        handleDrawerToggle={() => setIsLikedDrawerOpen((prev) => !prev)}
      />
      <CommentsDrawer
        isDrawerOpen={isCommentDrawerOpen}
        handleDrawerToggle={() => setIsCommentDrawerOpen((prev) => !prev)}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen((prev) => !prev)}
        onConfirm={handleDeleteConfirmed}
      />
      <ShareDrawer
        isDrawerOpen={isShareDrawerOpen}
        handleDrawerToggle={() => setIsShareDrawerOpen((prev) => !prev)}
      />
      <div className="sm:pb-2 sm:pt-2 px-2">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          eius provident qui laborum vitae consectetur iure est. Suscipit animi
          architecto aliquam expedita.
        </p>
      </div>
      <CardFooter
        setIsLikedDrawerOpen={setIsLikedDrawerOpen}
        setIsCommentDrawerOpen={setIsCommentDrawerOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsShareDrawerOpen={setIsShareDrawerOpen}
      />
    </div>
  );
};

export default TweetCard;
