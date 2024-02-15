import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-100 flex justify-center items-center flex-col">
      <div className="px-10 py-5 text-black">
        <h2 className="text-2xl">404 Not Found !</h2>
      </div>
      <Button onClick={() => navigate("/")}>Go back to Home page </Button>
    </div>
  );
};

export default NotFound;
