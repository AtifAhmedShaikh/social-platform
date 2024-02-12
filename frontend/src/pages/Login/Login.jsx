import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/authSchema";

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
    <div className="py-0 text-center h-screen">
      <div className="py-5">
        <h2 className="text-4xl">Login your account</h2>
      </div>
      <form
        className="max-w-md mx-auto h-auto flex justify-start items-center flex-col mt-24"
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
