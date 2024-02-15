import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import UserProfile from "../pages/Profile/UserProfile";
import UserGallery from "../pages/Gallery/UserGallery";
import WatchHistory from "../pages/History/WatchHistory";
import LikedHistory from "../pages/History/LikedHistory";
import TweetsList from "../pages/Tweets/TweetsPage";
import ReelsList from "../pages/Reels/ReelsList";
import NotFound from "../pages/Error/NotFound";
import UpdateAccount from "../pages/EditProfile/EditProfilePage";
import ContentCreationHub from "../pages/ContentCreation/ContentCreationPage";
import UsersList from "../pages/Users/UsersPage";
import LandingPage from "../pages/Home/HomePage";
import PostsPage from "../pages/Posts/PostsPage";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/tweets" element={<TweetsList />} />
        <Route path="/reels" element={<ReelsList />} />
        <Route path="/peoples" element={<UsersList />} />
        <Route path="/users/profiles/:username" element={<UserProfile />} />
        <Route path="/gallery" element={<UserGallery />} />
        <Route path="/liked-history" element={<LikedHistory />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/edit-profile" element={<UpdateAccount />} />
        <Route path="/create-content" element={<ContentCreationHub />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
