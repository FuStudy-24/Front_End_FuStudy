"use client";
import NavDashboard from "@/components/NavDashboard";
import Slidebar from "@/components/Slidebar";
import {
  getAllMentor,
  verifyMentor
} from "@/lib/service/adminService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Mentor = () => {
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
                                  {user.verifyStatus ? (
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
