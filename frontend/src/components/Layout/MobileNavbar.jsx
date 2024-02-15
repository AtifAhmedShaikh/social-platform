import { NavLink } from "react-router-dom";
import { navigationItems } from "@/constants/navigationItems";
import { computeNavLinkStyle } from "@/helpers/NavigationHelper";
const MobileNavbar = () => {
  return (
    <div className="bg-slate-900 fixed text-white w-screen h-16 bottom-0 z-30 flex justify-between items-between sm:hidden">
      {navigationItems.map((item) => {
        return (
          <li key={item.path}>
            <NavLink
              to={item.path}
              key={item.label}
              className={computeNavLinkStyle}
            >
              <span className="text-[19px]">{item.icon}</span>
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};

export default MobileNavbar;
