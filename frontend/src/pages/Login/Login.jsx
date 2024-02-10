import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="py-4 text-center">
      <div className="py-5">
      <h2 className="text-4xl">
        Login your account
      </h2>
      </div>
    <form className="max-w-md mx-auto h-auto flex justify-start items-center flex-col ">
      <Input type="text" label="Username or Email " placeholder="Enter your Username or Email " error={true} />
      <Input type="password" label="Password" placeholder="Enter the password" error={true}/>
      <div className="flex justify-start w-full">
      <Button type="submit" variant="primary">
        Submit
      </Button>
      </div>
    </form>
    </div>
  );
};

export default Login;
