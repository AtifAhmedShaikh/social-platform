import { NavLink } from "react-router-dom";
import { navigationItems } from "@/constants/navigationItems";
import { computeNavLinkStyle } from "@/helpers/NavigationHelper";

const Sidebar = () => {
  return (
    <div className="hidden  w-[25%] bg-slate-900 text-white sm:flex flex-col justify-center items-center h-screen fixed">
      <ul className="list-none block gap-5">
        {navigationItems.map((item) => {
          return (
            <li
              key={item.label}
              className="relative m-0 p-0 mb-3 w-fit hover:border-b h-8 hover:text-orange-500   hover:border-orange-500"
            >
              <NavLink to={item.path} className={computeNavLinkStyle}>
                <span>{item.icon}</span>
                <span className="transition-[0.2s]">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
