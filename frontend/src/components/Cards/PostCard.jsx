import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const PostCard = () => {
  return (
    <div className="border rounded-md w-100 p-2 sm:w-3/6 h-auto shadow-md mb-5 hover:bg-gray-100 sm:hover:scale-95 hover:shadow-lg">
      <CardHeader />
      <div className="sm:my-2 ">
        <p className="text-sm">
          hello i am here why you are here so what we are here so why you here
          tell me why,come form earth so what we will do
        </p>
      </div>
      <img
        className="h-[200px] rounded-md w-[100%] hover:scale-[0.97] border-b "
        src="https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
      />

      <CardFooter />
    </div>
  );
};

export default PostCard;
