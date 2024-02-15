// function compute the style for every NavLink based on their activity and pending status
export const computeNavLinkStyle = ({ isActive, isPending }) => {
  // If the link is pending, apply the style for pending
  if (isPending) {
    return "pending";
  }
  // If the link is active, apply active style
  else if (isActive) {
    return "text-orange-700 flex transition-[0.2s] gap-2 py-2";
  }
  // Otherwise, apply the default style
  else {
    return "flex transition-[0.2s] gap-2 py-2";
  }
};
