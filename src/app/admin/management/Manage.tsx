"use client";
import NavDashboard from "@/components/NavDashboard";
import Slidebar from "@/components/Slidebar";
import useAuthStore from "@/lib/hooks/useUserStore";
import { getAllTransaction } from "@/lib/service/adminService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Manage = () => {
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
  console.log(pageIndex);

  const createDate = (stringDate: string) => {
    const datePart = stringDate.split("T")[0];
    const timePart = stringDate?.split("T")[1]?.split(".")[0] || "";
    const date = new Date(datePart);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    const createDate = `${timePart}-${day}/${month}/${year}`;
    return createDate;
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
            <div className="mb-4 grid grid-cols-1 gap-6">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                  <div>
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                      Transaction
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
    </>
  );
};
