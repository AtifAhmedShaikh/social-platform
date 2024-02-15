import { LikeIcon } from "@/components/Icons/IconConfig";

const CommentCard = () => {
  return (
    <div className="card w-100 h-auto border-b px-3 pb-2 mb-5">
      <div className="flex  w-100 justify-between">
        <div className="flex justify-between w-100">
          <img
            className="h-[25px]  w-[25px] rounded-[20px] "
            src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
          />
          <div className="flex flex-col px-3">
            <span className="text-[11px] font-bold">
              Atif Ahmed Shaikh{" "}
              <span className="ml-3 text-[11px] font-bold text-gray-700">
                1h ago
              </span>{" "}
            </span>
            <span className="text-[10px] font-bold">atif_ahmed_shaikh_19</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <LikeIcon />
          <span className="text-[10px] font-bold">67</span>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-semibold text-[12px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
          explicabo labore delectus nulla? Aut earum beatae quas ab iusto
          adipisci dignissimos.
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
