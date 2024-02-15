import { useDispatch, useSelector } from "react-redux";
import { openDrawer, closeDrawer } from "@/redux/slices/DrawersToggleSlice";
const useDrawers = () => {
  const drawersStates = useSelector((state) => state.DrawersToggle);
  const dispatch = useDispatch();

  const handleDrawerClose = (drawerToClose) => {
    dispatch(closeDrawer(drawerToClose));
  };

  const handleDrawerOpen = (drawerToClose) => {
    dispatch(openDrawer(drawerToClose));
  };

  return { drawersStates, handleDrawerClose, handleDrawerOpen };
};

export default useDrawers;
