"use client";
// src/components/Layout/Navbar/Navbar.tsx
import { useUser } from "@/contexts/UserContext/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const { user, signOut } = useUser();
  const pathname = usePathname();

  const renderUser = () => {
    if (!user) {
      return <></>;
    }

    return (
      <div>
        <span className="pr-3">{user.email}</span>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  };

  return (
    <div className="mb-0">
      <div className="w-full max-w-screen-lg mx-auto py-8 flex justify-between">
        {renderUser()}
        {/* <div>Navbar</div> */}

        <input placeholder="search posts" />

        <div>
          <Link href="/" className="mr-3">Home</Link>
          <Link href="/blog" className="mr-3">Blog</Link>
          <Link href="/newsletter" className="mr-3">My Posts</Link>
          <Link href="/about" className="mr-3">About</Link>

          <input type="checkbox" name="isDarkMode" />

        </div>
      </div>
    </div>
  );
};

export default Navbar;
