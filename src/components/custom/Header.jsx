import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
<img src="/logo.svg?v=1" width={100} height={100} alt="Logo" />
{isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Starte</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
