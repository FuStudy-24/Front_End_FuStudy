"use client";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import useAuthStore from "@/lib/hooks/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWallet } from "@/lib/service/paymentService";
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Question", href: "#courses", current: false },
  { name: "Mentor", href: "#mentor", current: false },
  { name: "Group", href: "", current: false },
  { name: "Subcription", href: "#testimonial", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Add state for drawer
  const [popoverOpen, setPopoverOpen] = useState(false); // Add state for popover
  const [currentLink, setCurrentLink] = useState("/");
  const router = useRouter();
  const [fuCoin, setfuCoin] = useState(0);
  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from useAuthStore
    setPopoverOpen(false); // Close the popover after logout
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWallet(userInfo.id);
      // console.log(data.data.data.balance);
      localStorage.setItem("walletId",data.data.data.id);
      setfuCoin(data.data.data.balance);
    };
    if(isLoggedIn){
      fetchData();
    }
  }, []);

  // console.log(userInfo.username)
  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-40 lg:hidden"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
                <img
                  className="hidden h-full w-full lg:block"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
              </div>

              {/* LINKS */}
              <div className="hidden lg:block m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? "underline-links"
                            : "text-slategray",
                          "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100"
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            {/* SIGNIN / WELCOME */}
            <div className="flex items-center">
              {isLoggedIn ? ( // Check if user is logged in
                <div className="flex justify-between space-x-5">
                  <Link href='/order' passHref>
                    <div className="flex justify-between mt-2 space-x-2">
                      <div>{fuCoin}</div>
                      <div className=" ]loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 h-6 w-6 flex justify-center items-center text-yellow-700">
                        $
                      </div>
                    </div>
                  </Link>
                  <div>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={"https://github.com/shadcn.png"}
                            />
                            <AvatarFallback>
                              {userInfo.username
                                ? userInfo.username[0].toUpperCase()
                                : "CN"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white w-28 p-0 block text-center rounded-2xl space-y-2">
                        {userInfo.username == "admin1" && (
                          <Link href="/admin/dashboard" passHref>
                            <div className="border-b border-gray-200">
                              <button className="text-sm py-2 text-gray-700 hover:bg-gray-100 hover:rounded-full hover:px-2">
                                Dashboard
                              </button>
                            </div>
                          </Link>
                        )}

                        <Link href="/profile" passHref>
                          <div className="border-b border-gray-200">
                            <button className="text-sm py-2 text-gray-700 hover:bg-gray-100 hover:rounded-full hover:px-2">
                              Edit Profile
                            </button>
                          </div>
                        </Link>
                        <Link href="/question" passHref>
                          <div className="border-b border-gray-200">
                            <button className="text-sm py-2 text-gray-700 hover:bg-gray-100 hover:rounded-full hover:px-2">
                              Question
                            </button>
                          </div>
                        </Link>

                        <div className="">
                          <button
                            onClick={handleLogout}
                            className="text-sm py-1 text-gray-700 hover:bg-gray-100 hover:rounded-full hover:px-2"
                          >
                            Logout
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ) : (
                <Link href="/login" passHref>
                  <button
                    type="button"
                    className="text-sm text-Blueviolet font-medium px-[40px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                  >
                    Log In
                  </button>
                </Link>
              )}
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
