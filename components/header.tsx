"use client";

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Breadcrumbs from "./ui/Breadcrumbs";

function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5 bg-zinc-100">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img
          src="/logo2.svg"  // Path to the logo in the public directory
          alt="Logo"
          className="w-9 h-9 object-contain" // Adjust size as needed
        />
        {user && (
          <h1 className="text-xl font-semibold">
            {user?.firstName}{`'s`} Space
          </h1>
        )}
      </div>

      {/* Breadcrumbs */}
      <div className="flex-1 flex justify-center">
        <Breadcrumbs />
      </div>

      {/* User Authentication Buttons */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            Sign In
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
