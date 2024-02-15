import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/authSchema";
import {Link}from "react-router-dom"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitHandler = (data, event) => {
    event.preventDefault();
    console.log(data);
    reset();
  };
  return (
    <div className="py-0 text-center h-screen w-100 sm:w-auto">
      <div className="py-5">
        <h2 className="text-4xl">Login your account</h2>
      </div>
      <form
        className="sm:max-w-md w-100 mx-auto h-auto   flex justify-center sm:justify-start items-center flex-col mt-24"
        method="post"
        autoComplete="off"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          {...register("username")}
          type="text"
          label="Username or Email "
          placeholder="Enter your Username or Email "
          error={errors.username}
        />
        <Input
          {...register("password")}
          type="password"
          label="Password"
          placeholder="Enter the password"
          error={errors.password}
        />
        <div className="w-[75%] my-6">
          <p className="font-bold text-sm text-blue-500 text-start">
          <Link to="/" className="text-blue-900">
            Go Back Home
          </Link>
          </p>
          <p className="font-bold text-sm text-blue-500 text-start">{"Don't have an account"}
          <Link to="/auth/signUp" className=" ml-5 text-blue-900">
            SignUp Here
          </Link>
          </p>
        </div>
        <div className="flex justify-start w-[75%] ">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
