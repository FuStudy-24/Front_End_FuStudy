"use client";
import NavDashboard from "@/components/NavDashboard";
import Slidebar from "@/components/Slidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/lib/hooks/useUserStore";
import {
  addUser,
  getAllMentor,
  verifyMentor,
} from "@/lib/service/adminService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Mentor = () => {
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifyCheck, setverifyCheck] = useState(false);
  const [ data, setdata] = useState([
    {
      id: 0,
      userId: 0,
      academicLevel: "",
      workPlace: "",
      skill: "",
      onlineStatus: "",
      video: "",
      verifyStatus: true,
      user: {
        id: 0,
        username: "",
        fullname: "",
        email: "",
        identityCard: "",
        gender: "",
        avatar: "",
        dob: "",
        phone: "",
        status: true,
        role: null,
      },
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

  const onChangeUpdate = (key: any, e: any) => {
    setupdateForm((prevState) => ({
      ...prevState,
      [key]: e.target.value, // Use computed property name for dynamic updates
    }));
  };

  const handleVerify = async (id: any) => {
    try {
      const response = await verifyMentor(id);
      console.log(response.data.data);
      toast.success("Verify Successful!");
      setTimeout(() => {
        setverifyCheck(!verifyCheck);
      }, 1000);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMentor();
        console.log(response.data.data);
        const users = response.data.data;
        setdata(users);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [verifyCheck]);
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
        <Slidebar page={"Mentor"} />
        <div className="p-4 xl:ml-80">
          <NavDashboard page={"Mentor"} />
          <div className="mt-12">
            <div className="mb-4 grid grid-cols-1 gap-6">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                  <div>
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                      Mentors
                    </h6>
                  </div>
                  <div className="flex space-x-5 items-center">
                    <button
                      onClick={() => {
                        setShowModal("create");
                      }}
                      type="submit"
                      className="text-sm text-Blueviolet font-medium px-[28px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                    >
                      Add Mentor
                    </button>
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
                                <span>Username</span>
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Full Name
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                academic Level
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                skill
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                workPlace
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                verify Status
                              </div>
                            </th>

                            <th className="p-2">
                              <div className="font-semibold text-center">
                                action
                              </div>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-700">
                          {data.map((user, index) => (
                            <tr key={user.user.id}>
                              <td className="p-2">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-5" />{" "}
                                  <div className="text-black">
                                    {user.user.username}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.user.fullname}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.academicLevel}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.skill}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.workPlace}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.verifyStatus === true ? (
                                    <button className="text-sm text-Blueviolet font-medium px-3 py-[12.5px] border-[0] rounded-[100px] bg-green-600 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-green-400 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]">
                                      Verified
                                    </button>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleVerify(user.id);
                                      }}
                                      className="text-sm text-Blueviolet font-medium px-3  py-[12.5px] border-[0] rounded-[100px] bg-gray-700 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-green-600 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                    >
                                      Not verified
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="flex justify-between">
                                  <button
                                    onClick={() => {
                                      setShowModal("update");
                                    }}
                                    type="submit"
                                    className="text-sm text-Blueviolet font-medium px-4 py-[12.5px] border-[0] rounded-xl bg-orange-500 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-orange-300 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                  >
                                    Update
                                  </button>
                                  {showModal === "update" ? (
                                    <>
                                      <div className=" fixed left-1/3 top-16 flex items-center justify-center w-[550px]">
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
                                              <span className="sr-only">
                                                Close modal
                                              </span>
                                            </button>
                                            <div className="p-5">
                                              <h3 className="text-lg font-bold text-black ">
                                                Create User
                                              </h3>
                                            </div>
                                            <div className="flex px-16">
                                              <div className="pr-10 border-r-2">
                                                <Avatar className="h-40 w-40">
                                                  <AvatarImage src="https://github.com/shadcn.png" />
                                                  <AvatarFallback>
                                                    CN
                                                  </AvatarFallback>
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

                                                <div className="pt-6 space-y-3">
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
                                                </div>
                                              </div>
                                              <div className="pl-10 pb-10 space-y-3">
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Username
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Password
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Fullname
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
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
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex justify-end pb-4 pr-14">
                                              <button
                                                type="button"
                                                className="text-white rounded-full bg-[#2ba8fb] hover:bg-[#6fc5ff] focus:ring-4 focus:outline-none focus:ring-red-300  font-medium text-sm inline-flex items-center px-5 py-2.5 text-center"
                                              >
                                                Create
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                  <button
                                    onClick={() => {
                                      setShowModal("delete");
                                    }}
                                    type="submit"
                                    className="text-sm text-Blueviolet font-medium px-4 py-[12.5px] border-[0] rounded-xl bg-red-600 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-red-400 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                  >
                                    delete
                                  </button>
                                  {showModal === "delete" ? (
                                    <>
                                      <div className="overflow-y-auto fixed mt-14 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
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
                                              <span className="sr-only">
                                                Close modal
                                              </span>
                                            </button>
                                            <div className="p-4 md:p-5 text-center">
                                              <svg
                                                className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                              </svg>
                                              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                                Are you sure you want to delete?
                                              </h3>
                                              <button
                                                type="button"
                                                className="text-white rounded-full bg-[#2ba8fb] hover:bg-[#6fc5ff] focus:ring-4 focus:outline-none focus:ring-red-300  font-medium text-sm inline-flex items-center px-5 py-2.5 text-center"
                                              >
                                                Yes, I am sure
                                              </button>
                                              <button
                                                onClick={() => setShowModal("")}
                                                type="button"
                                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                                              >
                                                No, cancel
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
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
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
