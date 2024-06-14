"use client";
import Slidebar from "@/components/Slidebar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/lib/hooks/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { getAllUser } from "@/lib/service/adminService";

export const Dashboard = () => {
  const [data, setdata] = useState([{
    fullname: "",
    password: "",
    email: "",
    avatar: "",
    gender: "",
    identityCard: "",
    phone: "",
    username:"",
  }])
  const [popoverOpen, setPopoverOpen] = useState(false); // Add state for popover
  const router = useRouter();
  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout(); // Call the logout function from useAuthStore
    setPopoverOpen(false); // Close the popover after logout
    router.push("/");
  };

  useEffect(()=>{
    const fetchData = async () => {
      const response = await getAllUser();
      console.log(response.data.data);
      const users = response.data.data;
      setdata(users)
    } 
    fetchData()
  },[])
  console.log(data);
  
  return (
    <>
      <Slidebar />
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button
            type="button"
            className="text-lg text-gray-600 sidebar-toggle"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 font-medium"
              >
                Dashboard
              </a>
            </li>
            {/* <li className="text-gray-600 mr-2 font-medium">/</li>
            <li className="text-gray-600 mr-2 font-medium">Analytics</li> */}
          </ul>
          <ul className="ml-auto flex items-center">
            {/* <li className="mr-1 dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              >
                <i className="ri-search-line"></i>
              </button>
              <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                <form action="" className="p-4 border-b border-b-gray-100">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                      placeholder="Search..."
                    />
                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </form>
                <div className="mt-3 mb-2">
                  <div className="text-[13px] font-medium text-gray-400 ml-4 mb-2">
                    Recently
                  </div>
                  <ul className="max-h-64 overflow-y-auto">
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            Create landing page
                          </div>
                          <div className="text-[11px] text-gray-400">$345</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li> */}
            {/* <li className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              >
                <i className="ri-notification-3-line"></i>
              </button>
              <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                  <button
                    type="button"
                    data-tab="notification"
                    data-tab-page="notifications"
                    className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
                  >
                    Notifications
                  </button>
                  <button
                    type="button"
                    data-tab="notification"
                    data-tab-page="messages"
                    className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
                  >
                    Messages
                  </button>
                </div>
                <div className="my-2">
                  <ul
                    className="max-h-64 overflow-y-auto"
                    data-tab-for="notification"
                    data-page="notifications"
                  >
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-400">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-400">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-400">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-400">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            New order
                          </div>
                          <div className="text-[11px] text-gray-400">
                            from a user
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="max-h-64 overflow-y-auto hidden"
                    data-tab-for="notification"
                    data-page="messages"
                  >
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        />
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                            John Doe
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Hello there!
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li> */}
            <li className="dropdown ml-3">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={"https://github.com/shadcn.png"} />
                      <AvatarFallback>
                        {userInfo.username
                          ? userInfo.username[0].toUpperCase()
                          : "CN"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-28 p-0 block text-center rounded-2xl space-y-2">
                  <Link href="/profile" passHref>
                    <div className="border-b border-gray-200">
                      <button className="text-sm py-2 text-gray-700 hover:bg-gray-100">
                        Edit Profile
                      </button>
                    </div>
                  </Link>

                  <div className="">
                    <button
                      onClick={handleLogout}
                      className="text-sm py-1 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </div>
        <div className="col-span-full xl:col-span-8 shadow-lg rounded-sm p-6">
          <header className="px-5 py-4 border-b">
            <h2 className="font-semibold  text-black">User</h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left flex items-center">
                        <input type="checkbox" className="mr-5" />{" "}
                        <span>Username</span>
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Fullname</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Email</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        ID
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Gender
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Phone</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-700">
                  {/* Row */}
                  {/* <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-5" />{" "}
                        <div className="text-black">Github.com</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">2.4K</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">$3,877</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">267</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">4.7%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">4.7%</div>
                    </td>
                  </tr> */}
                  {data.map((user) =>(
                    <tr key={user.username}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-5" />{" "}
                        <div className="text-black">{user.username}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.fullname}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.email}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.identityCard}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.gender}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.phone}</div>
                    </td>
                  </tr>
                  ))}

                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-slate-700 bg-white px-4 py-3 sm:px-6 text-black">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">20</span> results
                    </p>
                  </div>

                  <div className="flex">
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium  bg-white border rounded-lg  dark:bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <svg
                        className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      Previous
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium  bg-white border rounded-lg  dark:bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Next
                      <svg
                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
