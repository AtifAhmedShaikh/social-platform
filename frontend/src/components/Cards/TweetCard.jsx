import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { IoChatboxEllipses, IoShareSocialSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TweetCard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = () => {
    setIsDeleteModalOpen(false);
  };

  const isUploadedByMe = true;
  return (
    <div className="border rounded-md p-2 lg:w-1/2 md:w-1/3 w-[25%] h-auto shadow-md mb-5 hover:scale-95 hover:shadow-lg">
      <div className="h-[15%] border-b pb-3 mb-3 flex items-center justify-between px-3">
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
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteConfirmed}
        />
        <Button variant="primary" size="md">
          Follow
        </Button>
      </div>
      <div className="pb-5 pt-2 px-2">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          eius provident qui laborum vitae consectetur iure est. Suscipit animi
          architecto aliquam expedita.
        </p>
      </div>
      <div className="pb-2">
        <span className="text-[11px] font-bold ml-1">
          4 users likes and 21 comments{" "}
        </span>
      </div>
      <div className="flex justify-between items-center h-auto py-2 pl-3 border-t pt-2">
        <div className="flex gap-5 text-[18px]">
          <FaRegHeart className="hover:scale-x-125 transition tracking-tighter" />
          <IoChatboxEllipses className="hover:scale-x-110 transition tracking-tighter" />
          <IoShareSocialSharp className="hover:scale-x-110 transition tracking-tighter" />
        </div>
        <div className="flex gap-3">
          {isUploadedByMe && (
            <RiDeleteBin6Line
              onClick={handleDeleteButtonClick}
              className="hover:scale-x-110 transition tracking-tighter"
            />
          )}
          <FaRegBookmark className="hover:scale-x-110 transition tracking-tighter" />
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
