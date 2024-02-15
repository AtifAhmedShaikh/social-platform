import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schema/authSchema";
import { useState } from "react";
import { convertToFormData } from "@/helpers/convertor.js";
const SignUp = () => {
  const [files, setFiles] = useState({ avatar: null, coverImage: null });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitHandler = (data, event) => {
    event.preventDefault();
    const userData = convertToFormData(data, files);
    //....
    console.log(userData.get("coverImage"));
    reset();
  };

  // handle avatar and coverImage files to set both in state
  const handleImageFiles = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFiles({ ...files, [name]: file });
  };

  return (
    <div className="py-4 text-center h-screen overflow-y-scroll  mb-20 pb-20  sm:pb-10 sm:mb-0 ">
      <div className="py-5">
        <h2 className="text-4xl">Create a new account</h2>
        <p className="text-sm">
          Hi, Welcome to my App we were excited to join you
        </p>
      </div>
      <form
        className="max-w-md mx-auto h-auto flex justify-start items-center flex-col "
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          {...register("name")}
          type="text"
          label="Name "
          placeholder="Enter your Name "
          error={errors.name}
        />
        <Input
          {...register("username")}
          type="text"
          label="Username"
          placeholder="Enter your Username"
          error={errors.username}
        />
        <Input
          {...register("email")}
          type="email"
          label="Email"
          placeholder="Enter your Email Address"
          error={errors.email}
        />
        <Input
          {...register("password")}
          type="password"
          label="Password"
          placeholder="Enter the password"
          error={errors.password}
        />
        <Input
          {...register("confirmPassword")}
          type="password"
          label="Confirm Password"
          placeholder="Enter Confirm Password "
          error={errors.confirmPassword}
        />
        <Input
          {...register("bio")}
          type="text"
          label="Bio or Headline "
          placeholder="I am student | working with React "
          error={errors.bio}
        />

        <Input
          className="file:bg-slate-900 file:border-0 file:text-white file:rounded-md border-0 ring-0 file:px-2 file:py-2 focus:ring-0 file:focus:ring-blue-300"
          type="file"
          label="Upload Avatar"
          name="avatar"
          placeholder="Attach Profile Image  "
          accept="image/*"
          onChange={handleImageFiles}
          required={true}
        />
        <Input
          className="file:bg-slate-900 file:border-0 file:text-white file:rounded-md border-0 ring-0 file:px-2 file:py-2 focus:ring-0 file:focus:ring-blue-300"
          type="file"
          name="coverImage"
          label="Upload CoverImage"
          accept="image/*"
          placeholder="Attach Profile Image  "
          onChange={handleImageFiles}
          required={true}
        />
        <div className="w-[75%] my-6">
        <p className="font-bold text-sm text-blue-500 text-start">
          <Link to="/" className="text-blue-900">
            Go Back Home
          </Link>
          </p>
          <p className="font-bold text-sm text-blue-500 text-start">
            Already have an account
            <Link to="/auth/login" className=" ml-5 text-blue-900">
              Login Here
            </Link>
          </p>
        </div>
        <div className="flex justify-start  w-[75%]  sm:w-full">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
