import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticatedUser = useSelector(
    (state) => state.Authentication.status
  );
  return (
    <div className="w-100 h-14 bg-slate-900 shadow-md flex justify-between items-center px-5 sticky top-0 z-30">
      <div>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
          onClick={() => navigate("/")}
        />
      </div>
      {!isAuthenticatedUser ? (
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/auth/signUp");
            }}
          >
            SignUp
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;
