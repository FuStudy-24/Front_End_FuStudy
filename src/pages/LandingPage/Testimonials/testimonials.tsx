"use client";
import useAuthStore from "@/lib/hooks/useUserStore";
import {
  getAllSubcription,
  purchaseSubcription,
} from "@/lib/service/subcriptionService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// CAROUSEL DATA

const Testimonials = () => {
  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));
  const [subcriptionData, setsubcriptionData] = useState([
    {
      id: 0,
      subcriptionName: "",
      subcriptionPrice: 0,
      limitQuestion: 0,
      limitMeeting: 0,
      status: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [subId, setsubId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSubcription();
        const subcriptions = response.data.data;
        setsubcriptionData(subcriptions);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const err = error.response.data.message;
          console.log(error);
          setError(err);
          toast.error(err);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleModel = (id: any) => {
    if (isLoggedIn) {
      setShowModal(true);
      console.log(id);
      setsubId(id);
      return;
    }
    toast.warning("Please Login!");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const subPrice = (name:any) => {
    switch (name) {
      case "Premium":
        return "$4";
        break;
      case "Basic":
        return "$2";
        break
      default:
        return "";
        break;
    }
  }

  const handleSubcription = async () => {
    const token = userInfo.token;
    console.log(token);
    console.log(subId);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, // Set the Content-Type header
    };
    const data = {
      subcriptionId: subId,
    };
    console.log(data);
    const jsonData = JSON.stringify(data);
    try {
      const response = await purchaseSubcription(jsonData, config);
      console.log(response);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const err = error.response.data.message;
        console.log(error);
        setError(err);
        toast.error(err);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="pt-40 pb-10 sm:pb-32 lg:py-32" id="testimonial">
      <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
        <section className="flex items-center justify-center mt-10 pb-10">
          <div
            className="p-4 sm:px-10 flex flex-col justify-center items-center text-base h-100vh mx-auto"
            id="pricing"
          >
            <h3 className="text-5xl font-semibold text-center flex gap-2 justify-center mb-10">
              Get Started for Free!
            </h3>
            <h3 className="text-2xl font-normal text-center flex gap-2 justify-center mb-10">
              Upgrade for advance features
            </h3>

            <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {subcriptionData.map((items, i) => (
                <div
                  key={i}
                  className="ring-2 ring-blue-600 rounded-3xl p-8 xl:p-10"
                >
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id="tier-extended"
                      className="text-blue-600 text-2xl font-semibold leading-8"
                    >
                      {items.subcriptionName}
                    </h3>
                    {items.subcriptionName === "Premium" ? (
                      <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                        Most popular
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="mt-4 text-base leading-6 text-gray-600">
                    1 license for up to 3 activations
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="line-through text-2xl font-sans text-gray-500/70">
                      {/* {items.subcriptionName === "Free" ? "" : "$2"} */}
                      {subPrice(items.subcriptionName)}
                    </span>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {items.subcriptionPrice}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="flex justify-center mt-4 text-sm text-Blueviolet font-medium px-[40px] py-[12.5px] border-[0] rounded-[100px] bg-[#2ba8fb] text-[#ffffff] font-[Bold] [transition:all_0.5s] hover:bg-[#6fc5ff] hover:[box-shadow:0_0_20px_#6fc5ff50] hover:scale-110 active:bg-[#3d94cf] active:[transition:all_0.25s] active:[box-shadow:none] active:scale-[0.98]"
                    onClick={() => handleModel(items.id)}
                  >
                    {items.subcriptionName === 'Free' ? "Started":"Buy Now"}
                  </button>
                  {showModal ? (
                    <>
                      <div className="overflow-y-auto fixed mt-14 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-3xl shadow ">
                            <button
                              type="button"
                              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                              onClick={() => setShowModal(false)}
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
                                Are you sure you want to upgrade?
                              </h3>
                              <button
                                onClick={() => handleSubcription()}
                                type="button"
                                className="text-white rounded-full bg-[#2ba8fb] hover:bg-[#6fc5ff] focus:ring-4 focus:outline-none focus:ring-red-300  font-medium text-sm inline-flex items-center px-5 py-2.5 text-center"
                              >
                                Yes, I am sure
                              </button>
                              <button
                                onClick={() => setShowModal(false)}
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
                  <ul
                    role="list"
                    className="mt-4 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                  >
                    <li className="flex gap-x-3 text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {items.limitMeeting} times meeting with mentor.
                    </li>
                    <li className="flex gap-x-3 text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {items.limitQuestion} times asking community.
                    </li>
                    <li className="flex gap-x-3 text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {items.subcriptionName === "Free"
                        ? "Including Ads."
                        : "No Ads."}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Testimonials;
