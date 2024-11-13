"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-[#222222] text-[#dddddd]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <p className="text-xl font-bold">
                <span className="text-5xl font-extrabold text-[#007BFF] drop-shadow-lg">
                  D
                </span>
                <span className="text-xl">aily</span>
              </p>
            </div>
            <div className="hidden md:flex justify-center items-center space-x-12">
              {path === "/task" || path === "/plans" || path === "/archive" ? (
                <>
                  <Link
                    className="hover:text-white transition-colors duration-200"
                    href="/task"
                  >
                    Tasks
                  </Link>

                  <Link
                    className="hover:text-white transition-colors duration-200"
                    href="/plans"
                  >
                    Plans
                  </Link>

                  {user?.picture ? (
                    <div>
                      <Image
                        src={user.picture}
                        alt="Image"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div>{user?.given_name?.[0]}</div>
                  )}
                  <Link
                    className="hover:text-white transition-colors duration-200"
                    href="/archive"
                  >
                    Archive
                  </Link>
                  <LogoutLink className="hover:text-white transition-colors duration-200">
                    Logout
                  </LogoutLink>
                </>
              ) : (
                <>
                  <Link
                    href="#info"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Info
                  </Link>
                  <Link
                    href="#howItWorks"
                    className="hover:text-white transition-colors duration-200"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="#pricing"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </Link>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMobile && isOpen ? (
          <>
            {path === "/task" || path === "/plans" || path === "/archive" ? (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    className="block hover:text-white transition-colors duration-200 py-2"
                    href="/task"
                  >
                    Tasks
                  </Link>
                  <Link
                    className="block hover:text-white transition-colors duration-200 py-2"
                    href="/plans"
                  >
                    Plans
                  </Link>
                  <Link
                    className="block hover:text-white transition-colors duration-200 py-2"
                    href="/archive"
                  >
                    Archive
                  </Link>
                  <LogoutLink className="block hover:text-white transition-colors duration-200 py-2">
                    Logout
                  </LogoutLink>
                </div>
              </div>
            ) : (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    href="#info"
                    className="block hover:text-white transition-colors duration-200 py-2"
                  >
                    Info
                  </Link>
                  <Link
                    href="#howItWorks"
                    className="block hover:text-white transition-colors duration-200 py-2"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="#pricing"
                    className="block hover:text-white transition-colors duration-200 py-2"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="block hover:text-white transition-colors duration-200 py-2"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}
