import {
  CreateContentIcon,
  EditProfileIcon,
  HomeIcon,
  LikedHistoryIcon,
  PostIcon,
  ProfileIcon,
  ReelIcon,
  TweetIcon,
  UnSaveIcon,
  UsersIcon,
  WatchHistory,
} from "@/components/Icons/IconConfig";

export const navigationItems = [
  {
    path: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/posts",
    label: "Posts",
    icon: <PostIcon />,
  },
  {
    path: "/tweets",
    label: "Tweets",
    icon: <TweetIcon />,
  },
  {
    path: "/reels",
    label: "Reels",
    icon: <ReelIcon />,
  },
  {
    path: "/peoples",
    label: "Peoples",
    icon: <UsersIcon />,
  },
  {
    path: "/users/profiles/atif",
    label: "My Profile",
    icon: <ProfileIcon />,
  },
  {
    path: "/gallery",
    label: "My Gallery",
    icon: <UnSaveIcon />,
  },
  {
    path: "/liked-history",
    label: "Liked History",
    icon: <LikedHistoryIcon />,
  },
  {
    path: "/watch-history",
    label: "Watch History",
    icon: <WatchHistory />,
  },
  {
    path: "/edit-profile",
    label: "Edit Profile",
    icon: <EditProfileIcon />,
  },
  {
    path: "/create-content",
    label: "Create Content",
    icon: <CreateContentIcon />,
  },
];
