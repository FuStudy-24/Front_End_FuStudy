"use client";
import NavDashboard from "@/components/NavDashboard";
import Slidebar from "@/components/Slidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  activateUser,
  addUser,
  deactivateUser,
  getAllUser,
  updateUser,
  getTotalUser,
  getTotalMoney,
  getAllTransaction,
  getAllMentor,
} from "@/lib/service/adminService";
import { Item } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Dashboard = () => {
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [flag, setflag] = useState(true);
  const [idUser, setidUser] = useState(0);
  const [error, setError] = useState("");
  const [pageIndex, setpageIndex] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [mentor, setmentor] = useState({
    verify: 0,
    notVerify: 0,
  });
  const [totalUser, settotalUser] = useState({
    numberOfUsers: 0,
    numberOfStudent: 0,
    numberOfMentor: 0,
  });
  const [totalTransaction, settotalTransaction] = useState(0);
  const [totalMoney, settotalMoney] = useState({
    totalAmount: 0,
  });
  const [data, setdata] = useState([
    {
      id: 0,
      fullname: "",
      password: "",
      email: "",
      avatar: "",
      gender: "",
      identityCard: "",
      dob: "",
      phone: "",
      username: "",
      status: "",
      role: {
        id: 0,
        roleName: "",
      },
    },
  ]);

  const [createForm, setcreateForm] = useState({
    fullname: "stringst",
    username: "",
    password: "",
    email: "example@gmail.com",
    gender: "male",
    dob: "2024-07-17T15:00:08.155Z",
    roleName: "",
    identityCard: "004151580193",
    phone: "0928803658",
  });

  const [updateData, setupdateData] = useState({
    fullname: "string",
    password: "string",
    email: "string",
    avatar: "string",
    gender: "string",
    identityCard: "string",
    phone: "string",
    dob: "",
    username: "string",
    role: {
      id: 0,
      roleName: "string",
    },
  });

  const [updateForm, setupdateForm] = useState({
    fullname: "",
    email: "",
    gender: "",
    identityCard: "",
    phone: "",
    dob: "",
  });

  const handlePageIndex = (index: any) => {
    if (index === "next") {
      // console.log("asdasd");
      setpageIndex((prev) => prev + 1);
      return;
    }
    if (pageIndex != 1) {
      if (index === "prev") {
        setpageIndex((prev) => prev - 1);
      }
    }
  };

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

  const createUser = async () => {
    //console.log(createForm);
    try {
      const res = await addUser(createForm);
      //console.log(res);
      setflag(!flag);
      setShowModal("");
      toast.success("Create Successful!");
    } catch (error: any) {
      if (error.response && error.response.data) {
        // console.log(error.response.data);
        const err = error.response.data.errors;
        toast.error(err);
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const update = async () => {
   // console.log(idUser);
   // console.log(updateForm);
    try {
      const response = await updateUser(idUser, updateForm);
     // console.log(response);
      setflag(!flag);
      setShowModal("");
      toast.success("Update Successful!");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const updateStatus = async () => {
   // console.log(idUser);
    try {
      const response = await activateUser(idUser);
     // console.log(response);
      setflag(!flag);
      toast.success("Active Successful!");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const err = error.response.data.message;
       // console.log(err);
      //  console.log(error);
        toast.error(err);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const deleteUser = async () => {
   // console.log(idUser);
    try {
      const response = await deactivateUser(idUser);
      //console.log(response);
      setflag(!flag);
      setShowModal("");
      toast.success("Deactivate Successful!");
    } catch (error: any) {
    //  console.log(error.response.data);
    }
  };

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (stringDate: string) => {
    const datePart = stringDate.split("T")[0];
    const date = new Date(datePart);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        //user
        const response = await getAllUser(pageIndex, pageSize);
        // console.log(response.data.data);
        const users = response.data.data;
        setdata(users);

        //totalMoney
        const resTotalMoney = await getTotalMoney();
        // console.log(resTotalMoney.data.data);
        const totalMoneyData = resTotalMoney.data.data;
        settotalMoney(totalMoneyData);

        //totalUser
        const resTotalUser = await getTotalUser();
        const totalUserData = resTotalUser.data.data;
        // console.log(resTotalUser.data.data);
        settotalUser(totalUserData);

        //totalTransaction
        const resTotalTransaction = await getAllTransaction("", "");
        const totalTransactionData = resTotalTransaction.data.data;
        // console.log(totalTransactionData.length);
        const total = totalTransactionData.length;
        settotalTransaction(total);

        //notVerifyMentor
        const resMentor = await getAllMentor("", "");
        // console.log(resMentor);
        const statusMentor = resMentor.data.data;
        // console.log(statusMentor);
        let verify = 0,
          notVerify = 0;

        statusMentor.map((item: any) => {
          if (item.verifyStatus) {
            verify++;
          } else {
            notVerify++;
          }
        });
        setmentor({ ...mentor, verify, notVerify });
      } catch (error) {
        setpageIndex((prev) => prev - 1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [flag, pageIndex]);
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
        <Slidebar page={"Home"} />
        <div className="p-4 xl:ml-80">
          <NavDashboard page={"Home"} />
          <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
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
                      fillRule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Revenue
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {formatCurrency(totalMoney.totalAmount)}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-blue-600">
                      {totalTransaction}
                    </strong>
                    &nbsp; Transactions
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
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Users
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {totalUser.numberOfUsers}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <div className="flex justify-between">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        {totalUser.numberOfMentor}
                      </strong>
                      &nbsp; Mentors
                    </p>
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-blue-600">
                        {totalUser.numberOfStudent}
                      </strong>
                      &nbsp; Students
                    </p>
                  </div>
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
                    Verify Mentor
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {mentor.verify}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  {mentor.notVerify === 0 ? (
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      All mentors are verified
                    </p>
                  ) : (
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-red-500">
                        {mentor.notVerify}
                      </strong>
                      &nbsp; Mentor not verify yet
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
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
              </div> */}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-6">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                  <div>
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                      Users
                    </h6>
                  </div>
                  <div className="flex space-x-5 items-center">
                    <button
                      onClick={(e) => {
                        setShowModal("create");
                      }}
                      type="submit"
                      className="text-sm text-Blueviolet font-medium px-[28px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                    >
                      Add User
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
                              Create User
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
                                </select>
                              </div>
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
                                Role
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Fullname
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Email
                              </div>
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
                              <div className="font-semibold text-center">
                                Phone
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-center">
                                Status
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
                          {data.map((user) => (
                            <tr key={user.username}>
                              <td className="p-2">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-5" />{" "}
                                  <div className="text-black">
                                    {user.username}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.role.roleName}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.fullname}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.email}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.identityCard}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.gender}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.phone}</div>
                              </td>
                              <td className="p-2">
                                {user.status ? (
                                  <button className="text-sm w-20 text-Blueviolet font-medium px-3 py-[12.5px] border-[0] rounded-[100px] bg-green-600 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-green-400 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]">
                                    Active
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setidUser(user.id);
                                      updateStatus();
                                    }}
                                    className="text-sm w-20 text-Blueviolet font-medium px-3  py-[12.5px] border-[0] rounded-[100px] bg-gray-700 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-green-600 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                  >
                                    Inactive
                                  </button>
                                )}
                              </td>
                              <td className="p-2">
                                <div className="flex justify-between">
                                  <button
                                    onClick={() => {
                                      setShowModal("update");
                                      setidUser(user.id);
                                      setupdateData(user);
                                      setupdateForm((prevState) => {
                                        const {
                                          email,
                                          fullname,
                                          gender,
                                          identityCard,
                                          phone,
                                          dob,
                                        } = user;
                                        return {
                                          ...prevState,
                                          email,
                                          fullname,
                                          gender,
                                          identityCard,
                                          phone,
                                          dob: formatDate(dob),
                                        };
                                      });
                                    }}
                                    type="submit"
                                    className="text-sm text-Blueviolet font-medium px-4 py-[12.5px] border-[0] rounded-[100px] bg-orange-500 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-orange-300 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                  >
                                    Update
                                  </button>
                                  {showModal === "update" ? (
                                    <>
                                      <div className=" fixed left-1/3 top-8 flex items-center justify-center w-[550px]">
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
                                                Update User
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
                                              </div>
                                              <div className="pl-10 pb-10 space-y-3">
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Fullname
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={
                                                      updateData.fullname
                                                    }
                                                    onChange={(e) => {
                                                      onChangeUpdate(
                                                        "fullname",
                                                        e
                                                      );
                                                    }}
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Email
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={
                                                      updateData.email
                                                    }
                                                    onChange={(e) => {
                                                      onChangeUpdate(
                                                        "email",
                                                        e
                                                      );
                                                    }}
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Gender
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={
                                                      updateData.gender
                                                    }
                                                    onChange={(e) => {
                                                      onChangeUpdate(
                                                        "gender",
                                                        e
                                                      );
                                                    }}
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  DOB
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={formatDate(
                                                      updateData.dob
                                                    )}
                                                    onChange={(e) => {
                                                      onChangeUpdate("dob", e);
                                                    }}
                                                    type="date"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  ID
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={
                                                      updateData.identityCard
                                                    }
                                                    onChange={(e) => {
                                                      onChangeUpdate(
                                                        "identityCard",
                                                        e
                                                      );
                                                    }}
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                                <label className="block text-gray-800 font-semibold text-sm">
                                                  Phone
                                                </label>
                                                <div className="mt-2">
                                                  <input
                                                    defaultValue={
                                                      updateData.phone
                                                    }
                                                    onChange={(e) => {
                                                      onChangeUpdate(
                                                        "phone",
                                                        e
                                                      );
                                                    }}
                                                    type="text"
                                                    className="block w-40 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex justify-end pb-4 pr-14">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  update();
                                                }}
                                                className="text-white rounded-full bg-[#2ba8fb] hover:bg-[#6fc5ff] focus:ring-4 focus:outline-none focus:ring-red-300  font-medium text-sm inline-flex items-center px-5 py-2.5 text-center"
                                              >
                                                Update
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
                                      setidUser(user.id);
                                    }}
                                    type="submit"
                                    className="text-sm text-Blueviolet font-medium px-4 py-[12.5px] border-[0] rounded-[100px] bg-red-600 text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-red-400 hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                                  >
                                    Delete
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
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  deleteUser();
                                                }}
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
                              {/* <span className="font-medium">10</span> of{" "} */}
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
      <ToastContainer />
    </>
  );
};
