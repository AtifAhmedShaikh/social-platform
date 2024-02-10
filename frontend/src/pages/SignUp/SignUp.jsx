import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  return (
    <div className="py-4 text-center">
      <div className="py-5">
      <h2 className="text-4xl">
        Create a new account
      </h2>
      <p className="text-sm">
        Hi, Welcome to my App we were excited to join you
      </p>
      </div>
    <form className="max-w-md mx-auto h-auto flex justify-start items-center flex-col ">
      <Input type="name" label="Name" placeholder="Enter your Name" />
      <Input type="text" label="Username" placeholder="Enter your Username" error={true} />
      <Input type="email" label="Email" placeholder="Enter your Email Address" />
      <Input type="password" label="Password" placeholder="Enter the password" error={true}/>
      <Input type="password" label="Confirm Password" placeholder="Enter Confirm Password " />
      <Input type="text" label="Bio or Headline " placeholder="I am student | working with React " />
      <Input type="file" label="Upload Avatar" placeholder="Attach Profile Image  " className="file:bg-slate-900 file:border-0 file:text-white file:rounded-md border-0 ring-0 file:px-2 file:py-2 focus:ring-0 file:focus:ring-blue-300" />
      <Input type="file" label="Upload CoverImage" placeholder="Attach Profile Image  " className="file:bg-slate-900 file:border-0 file:text-white file:rounded-md border-0 ring-0 file:px-2 file:py-2 focus:ring-0 file:focus:ring-blue-300" />
      <div className="flex justify-start w-full">
      <Button type="submit" variant="primary">
        Submit
      </Button>
      </div>
    </form>
    </div>
  );
};

export default SignUp;
