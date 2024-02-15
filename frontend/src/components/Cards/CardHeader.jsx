import { Button } from "@/components/ui/button";

const CardHeader = () => {
  return (
    <div className="h-[15%] border-b pb-3 flex items-center justify-between px-3">
      <div className="flex">
        <img
          className="h-[40px]  w-[40px] rounded-[20px] hover:scale-95"
          src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
        />
        <div className="flex flex-col px-3">
          <span className="text-[15px]">
            Atif Ahmed Shaikh{" "}
            <span className="ml-3 text-[11px] font-bold text-gray-700">
              1h ago
            </span>{" "}
          </span>
          <span className="text-[12px]">atif_ahmed_shaikh_19</span>
        </div>
      </div>
      <Button variant="primary" size="md">
        Follow
      </Button>
    </div>
  );
};

export default CardHeader;
