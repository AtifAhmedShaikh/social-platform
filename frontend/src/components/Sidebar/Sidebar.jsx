import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigationItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/tweets",
      label: "Tweets",
    },
    {
      path: "/reels",
      label: "Reels",
    },
    {
      path: "/users/profiles/atif",
      label: "My Profile",
    },
    {
      path: "/gallery",
      label: "My Gallery",
    },
    {
      path: "/liked-history",
      label: "Liked History",
    },
    {
      path: "/watch-history",
      label: "Watch History",
    },
    {
      path: "/update-account",
      label: "Update Account",
    },
    {
      path: "/create-content",
      label: "Create new Content",
    },
  ];
  const linksStyle = ({ isActive, isPending }) =>
    isPending
      ? "pending"
      : isActive
      ? "text-orange-700"
      : "hover:border-b hover:text-orange-500  hover:border-orange-500 navLinks";//
  return (
    <div className="w-[25%] bg-slate-900 text-white flex flex-col justify-center items-center h-screen fixed">
      <ul className="list-none flex flex-col gap-5">
        {navigationItems.map((item) => {
          return (
            <li key={item.label} className="relative w-min-content">
              <NavLink to={item.path} className={linksStyle}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
