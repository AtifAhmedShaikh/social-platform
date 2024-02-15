import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";
import ShareDrawer from "../Drawers/ShareDrawer";
import LikedUsersListDrawer from "@/components/Drawers/LikedUsersListDrawer";
import CommentsDrawer from "@/components/Drawers/CommentsDrawer";
import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import FollowersListDrawer from "@/components/Drawers/FollowersListDrawer";
import FollowingListDrawer from "@/components/Drawers/FollowingListDrawer";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      {/* Mobile Navbar display only in mobile screen */}
      <MobileNavbar />
      <div className="overflow-x-hidden overflow-y-scroll absolute right-0 w-100 bottom-0 sm:w-[75%] h-[90vh] sm:pb-0 pb-10 sm:mt-0 mt-10">
        {children}
      </div>
      {/*  Add all Drawers  and Modals in App layout */}
      <LikedUsersListDrawer />
      <CommentsDrawer />
      <ShareDrawer />
      <FollowersListDrawer />
      <FollowingListDrawer />
      <DeleteConfirmationModal />
      <Toaster />
    </React.Fragment>
  );
};
export default Layout;
