import { Button } from "@/components/ui/button";
const UserCard = () => {
  return (
    <div className="w-100 sm:w-100 h-16 mb-5 border-b border-gray-300 flex justify-between items-center relative px-2">
      <div className="flex ml-3">
        <img
          className="h-[40px]  w-[40px] rounded-[20px] hover:scale-95"
          src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
        />
        <div className="flex flex-col px-3">
          <span className="text-[11px] font-semibold sm:text-md">
            Atif Ahmed Shaikh{" "}
            <span className="ml-3 text-[11px] font-bold text-gray-700">
              1h ago
            </span>{" "}
          </span>
          <span className="text-[10px] font-semibold sm:text-md">
            atif_ahmed_shaikh_19
          </span>
          <span className="text-[8px] font-[700] mt-1 sm:text-[11px]">
            {" "}
            32 followers,  609k following
          </span>
        </div>
      </div>
      <div>
        <Button variant="primary" size="md">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
