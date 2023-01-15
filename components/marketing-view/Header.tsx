import React from "react";

//ui components
import { Container, JellyButton } from "components/ui";

//next link
import Link from "next/link";

function Header() {
  return (
    <header className="p-5 text-sm sticky top-0 bg-white dark:bg-gray-800">
      <Container className="flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          OnChat
        </Link>

        <div className={`flex gap-3 sm:gap-8`}>
          <Link href={"/signin"}>
            <JellyButton>Sign In</JellyButton>
          </Link>
          <Link href={"/signup"}>
            <JellyButton className="bg-blue-500 text-white shadow-none">
              Sign Up
            </JellyButton>
          </Link>
        </div>
      </Container>
    </header>
  );
}

export default Header;
