"use client";
import NavDashboard from "@/components/NavDashboard";
import Slidebar from "@/components/Slidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/lib/hooks/useUserStore";
import { addUser, getAllTransaction } from "@/lib/service/adminService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import page from "./page";

export const Manage = () => {
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [data, setdata] = useState([
    {
      id: 0,
      walletId: 0,
      type: "",
      ammount: 0,
      createTime: "",
      description: "",
      userId: 0,
      username: "",
      email: "",
      fullname: "",
    },
  ]);
  const [createForm, setcreateForm] = useState({
    username: "",
    password: "",
    email: "example@gmail.com",
    fullname: "",
    avatar: "string",
    gender: "",
    roleName: "",
    identityCard: "079202035866",
    phone: "0773850946",
  });

  const [updateForm, setupdateForm] = useState({
    fullname: "",
    email: "",
    gender: "",
    identityCard: "",
    phone: "",
    dob: "",
  });
  const [popoverOpen, setPopoverOpen] = useState(true); // Add state for popover
  const router = useRouter();
  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const onChangeCreate = (key: any, e: any) => {
    setcreateForm((prevState) => ({
      ...prevState,
      [key]: e.target.value, // Use computed property name for dynamic updates
    }));
  };
  console.log(pageIndex);
  
  const createDate = (stringDate: string) => {
    const datePart = stringDate.split("T")[0];
    const timePart = stringDate?.split("T")[1]?.split(".")[0] || "";
    // Create a Date object from the date string
    const date = new Date(datePart);

    // Get the day, month (0-indexed!), and year
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const year = date.getFullYear();
    const createDate = `${timePart}-${day}/${month}/${year}`;
    return createDate;
  };

  const onChangeUpdate = (key: any, e: any) => {
    setupdateForm((prevState) => ({
      ...prevState,
      [key]: e.target.value, // Use computed property name for dynamic updates
    }));
  };

  const handlePageIndex = (index: any) => {
    if (pageIndex === 1) {
      if (index === "next") {
        console.log("asdasd");
        setpageIndex((prev) => prev + 1);
        return;
      }
      return;
    }
    if (index === "prev") {
      setpageIndex((prev) => prev - 1);
    }
  };

  const createUser = async () => {
    console.log(createForm);
    const res = await addUser(createForm);
    console.log(res);
  };

  const updateUser = async () => {
    console.log(updateUser);
  };
  console.log(typeof pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTransaction(pageIndex, pageSize);
        console.log(response.data.data);
        const users = response.data.data;
        setdata(users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex]);
  console.log(data);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold">
        Loading{" "}
        <div className="flex flex-row gap-2">
          <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
          <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:.3s]"></div>
          <div className="w-2 h-2 rounded-full  bg-black animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <Slidebar page={"Management"} />
        <div className="p-4 xl:ml-80">
          <NavDashboard page={"Management"} />
          <div className="mt-12">
            {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Today Money
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    $53
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong>&nbsp;than
                    last week
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Today Users
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    3
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+3%</strong>&nbsp;than
                    last month
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    New Clients
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    4
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-red-500">-2%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Sales
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    $100
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+5%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div>
            </div> */}

            <div className="mb-4 grid grid-cols-1 gap-6">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                  <div>
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                      Transaction
                    </h6>
                    {/* <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        ></path>
                      </svg>
                      <strong>30 done</strong> this month
                    </p> */}
                  </div>
                  <div className="flex space-x-5 items-center">
                    {/* <button
                      onClick={() => {
                        setShowModal("create");
                      }}
                      type="submit"
                      className="text-sm text-Blueviolet font-medium px-[28px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                    >
                      Add Major
                    </button> */}
                    <button
                      aria-expanded="false"
                      aria-haspopup="menu"
                      id=":r5:"
                      className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currenColor"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                {showModal === "create" ? (
                  <>
                    <div className=" fixed left-1/3 top-24 flex items-center justify-center w-[550px]">
                      <div className="relative p-4 w-full max-h-full">
                        <div className="relative bg-white rounded-3xl shadow ">
                          <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                            onClick={() => setShowModal("")}
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-black ">
                              Create Mentor
                            </h3>
                          </div>
                          <div className="flex px-16">
                            <div className="pr-10 border-r-2">
                              <Avatar className="h-40 w-40">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>

                              <div className="flex flex-col items-center justify-center mt-4">
                                <label
                                  htmlFor="file"
                                  className="inline-flex items-center px-4 py-2 bg-[#2ba8fb] text-white rounded-xl hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                >
                                  {" "}
                                  Browse file
                                </label>
                                <input
                                  id="file"
                                  type="file"
                                  className="hidden"
                                />
                              </div>

                              {/* <div className="pt-6 space-y-3">
                                <label className="block text-gray-800 font-semibold text-sm">
                                  ID
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                  />
                                </div>
                                <label className="block text-gray-800 font-semibold text-sm">
                                  Phone
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                  />
                                </div>
                              </div> */}
                            </div>
                            <div className="pl-10 pb-10 space-y-3">
                              <label className="block text-gray-800 font-semibold text-sm">
                                Username
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeCreate("username", e);
                                  }}
                                  className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                              </div>
                              <label className="block text-gray-800 font-semibold text-sm">
                                Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    onChangeCreate("password", e);
                                  }}
                                  className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                              </div>
                              <label className="block text-gray-800 font-semibold text-sm">
                                Role
                              </label>
                              <div className="mt-2">
                                <select
                                  onChange={(e) => {
                                    e.preventDefault();
                                    onChangeCreate("roleName", e);
                                  }}
                                  className="bg-white border w-40  text-gray-900 text-sm rounded-md ring-1 ring-inset ring-gray-400 focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                                >
                                  <option value={"Student"}>Student</option>
                                  <option value={"Mentor"}>Mentor</option>
                                  <option value={"Moderator"}>Moderator</option>
                                </select>
                              </div>
                              {/* <label className="block text-gray-800 font-semibold text-sm">
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                              </div>
                              <label className="block text-gray-800 font-semibold text-sm">
                                Gender
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                />
                              </div> */}
                            </div>
                          </div>
                          <div className="flex justify-end pb-4 pr-14">
                            <button
                              type="button"
                              onClick={createUser}
                              className="text-white rounded-full bg-[#2ba8fb] hover:bg-[#6fc5ff] focus:ring-4 focus:outline-none focus:ring-red-300  font-medium text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                              Create
                            </button>
                            {/* <button
                              onClick={() => setShowModal(false)}
                              type="button"
                              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                            >
                              Cancel
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
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
                                <span>No</span>
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                user
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                type
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                ammount
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                create Time
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                description
                              </div>
                            </th>

                            {/* <th className="p-2">
                              <div className="font-semibold text-center">
                                action
                              </div>
                            </th> */}
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-700">
                          {data.map((item) => (
                            <tr key={item.id}>
                              <td className="p-2">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-5" />{" "}
                                  <div className="text-black">{item.id}</div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.username}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{item.type}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.ammount}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {createDate(item.createTime)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.description}
                                </div>
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
                              <span className="font-medium">{data.length}</span>{" "}
                              results
                            </p>
                          </div>

                          <div className="flex space-x-3">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageIndex("prev");
                              }}
                              className="flex items-center justify-center w-28 px-3 h-8 text-sm font-medium  bg-white border rounded-lg   border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white"
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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                              </svg>
                              Previous
                            </a>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageIndex("next");
                              }}
                              className="flex items-center justify-center w-28 px-3 h-8 text-sm font-medium  bg-white border rounded-lg   border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white"
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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.5 5h8.5m0 0L9 1m3.5 4L9 9"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
