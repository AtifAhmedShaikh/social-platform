import React from "react";
import Navbar from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-lg font-bold">Hi, Welcome to my App</h3>
        <p>First you should create a account on the App</p>
        <div className="flex gap-3">
          <Button onClick={() => navigate("/posts")}>
            {"Let's Get Started"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
