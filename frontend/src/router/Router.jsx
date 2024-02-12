import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import UserProfile from "../pages/Profile/UserProfile";
import UserGallery from "../pages/Gallery/UserGallery";
import WatchHistory from "../pages/History/WatchHistory";
import LikedHistory from "../pages/History/LikedHistory";
import TweetsList from "../pages/Tweets/TweetsList";
import ReelsList from "../pages/Reels/ReelsList";
import NotFound from "../pages/Error/NotFound";
import UpdateAccount from "../pages/EditProfile/UpdateAccountPage";
import ContentCreationHub from "../pages/ContentCreation/ContentCreationHub";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
      <Route path="/tweets" element={<TweetsList />} />
      <Route path="/reels" element={<ReelsList />} />
      <Route path="/users/profiles/:username" element={<UserProfile />} />
      <Route path="/gallery" element={<UserGallery />} />
      <Route path="/liked-history" element={<LikedHistory />} />
      <Route path="/watch-history" element={<WatchHistory />} />
      <Route path="/update-account" element={<UpdateAccount />} />
      <Route path="/create-content" element={<ContentCreationHub />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
