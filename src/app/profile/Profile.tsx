"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/lib/hooks/useUserStore";
import {
  addMajor,
  deleteMajor,
  getAllMajor,
  getMentor,
  getMentorMajor,
  updateMentorInfo,
} from "@/lib/service/mentorService";
import {
  getProfile,
  getTransaction,
  updateProfile,
} from "@/lib/service/profileService";
import { getUserSubcription } from "@/lib/service/subcriptionService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [checkEdit, setcheckEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [transaction, settransaction] = useState([
    {
      id: 0,
      type: "",
      ammount: 0,
      createTime: "",
      description: "",
    },
  ]);
  const [subcription, setsubcription] = useState({
    status: "",
    startDate: "",
    endDate: "",
    currentQuestion: 0,
    currentMeeting: 0,
    type: "",
    price: 0,
  });

  const [allMajor, setallMajor] = useState([
    {
      id: 0,
      majorName: "",
    },
  ]);

  const [major, setmajor] = useState({
    majorName: "",
    id: "",
  });

  const [updateMajor, setupdateMajor] = useState({
    mentorId: 0,
    majorId: 0,
  });

  const [mentor, setmentor] = useState({
    academicLevel: "",
    workPlace: "",
    skill: "",
    video: "",
    id: 0,
  });

  const [updateMentor, setupdateMentor] = useState({
    academicLevel: "",
    workPlace: "",
    skill: "",
    file: null,
  });

  const [updateUser, setupdateUser] = useState({
    fullname: "",
    email: "",
    gender: "",
    identityCard: "",
    phone: "",
    dob: "",
  });

  const [accountProfile, setaccountProfile] = useState({
    email: "",
    fullname: "",
    avatar: "",
    gender: "",
    identityCard: "",
    phone: "",
    dob: "",
  });

  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const handlePageIndex = (index: any) => {
    if (index === "next") {
      setpageIndex((prev) => prev + 1);
      return;
    }
    if (pageIndex != 1) {
      if (index === "prev") {
        setpageIndex((prev) => prev - 1);
      }
    }
  };
  
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (stringDate: string) => {
    if (stringDate === null) {
      return;
    }
    const datePart = stringDate.split("T")[0];
    const date = new Date(datePart);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const createDate = (stringDate: string) => {
    if (stringDate === null) {
      return;
    }
    const datePart = stringDate.split("T")[0];
    const timePart = stringDate?.split("T")[1]?.split(".")[0] || "";
    const date = new Date(datePart);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const createDate = `${timePart}-${day}/${month}/${year}`;
    return createDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile(userInfo.id);
        const data = res.data.data;
        // console.log(data);

        setaccountProfile((prevState) => {
          const { email, fullname, gender, identityCard, phone, dob } = data;
          return {
            ...prevState,
            email,
            fullname,
            gender,
            identityCard,
            phone,
            dob: dob,
          };
        });
        setupdateUser((prevState) => {
          const { email, fullname, gender, identityCard, phone, dob } = data;
          return {
            ...prevState,
            email,
            fullname,
            gender,
            identityCard,
            phone,
            dob: dob,
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      if (userInfo.roleName === "Mentor") {
        const resMentor = await getMentor(userInfo.id);
        const mentorData = resMentor.data.data[0];
        const { id } = mentorData;
        const mentorId = id;
        const resMentorMajor = await getMentorMajor(id);
        const mentorMajor = resMentorMajor.data.data[0];
        const resMajor = await getAllMajor();
        const allMajor = resMajor.data.data;
        // console.log(allMajor);
        if (mentorMajor) {
          setmajor((prevState) => {
            const {
              id,
              major: { majorName },
            } = mentorMajor;
            localStorage.setItem("idMentorMajor", id);
            return {
              ...prevState,
              majorName,
              id,
            };
          });

          setupdateMajor((prevState) => {
            const {
              major: { id },
            } = mentorMajor;
            localStorage.setItem("idMajor", id);
            return {
              ...prevState,
              mentorId: mentorId,
              majorId: id,
            };
          });
        }
        setallMajor(allMajor);
        setmentor((prevState) => {
          const { skill, academicLevel, workPlace } = mentorData;
          return {
            ...prevState,
            skill,
            academicLevel,
            workPlace,
          };
        });

        setupdateMentor((prevState) => {
          const { skill, academicLevel, workPlace } = mentorData;
          return {
            ...prevState,
            skill,
            academicLevel,
            workPlace,
          };
        });
      }

      try {
        const walletId = localStorage.getItem("walletId");
        const resTransaction = await getTransaction(walletId,pageIndex,pageSize);
        if (resTransaction.status === 200) {
          settransaction(resTransaction.data.data);
        }
      } catch (error) {
        console.log(error);
        setpageIndex((prev) => prev - 1);
      }

      try {
        const response = await getUserSubcription(userInfo.id);
        const subData = response.data.data[0];
        const subcriptionData = {
          status: "",
          startDate: "",
          endDate: "",
          currentQuestion: 0,
          currentMeeting: 0,
          type: "",
          price: 0,
        };
        subcriptionData.status = subData.status.toString();
        subcriptionData.type = subData.subcription.subcriptionName;
        subcriptionData.currentMeeting = subData.currentMeeting;
        subcriptionData.currentQuestion = subData.currentQuestion;
        subcriptionData.startDate = subData.startDate;
        subcriptionData.endDate = subData.endDate;
        subcriptionData.price = subData.subcription.subcriptionPrice;
        setsubcription(subcriptionData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [checkEdit, userInfo.id, userInfo.roleName,pageIndex]);

  const handleChange = (key: any, e: any) => {
    setupdateUser((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleMajor = (id: any) => {
    setupdateMajor({ ...updateMajor, majorId: id });
  };

  const handleChangeMentor = (key: any, e: any) => {
    setupdateMentor((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const id = localStorage.getItem("idMentorMajor");
    const idMajor = localStorage.getItem("idMajor");
    const userData = JSON.stringify(updateUser);
    const mentorData = updateMentor;
    const majorData = JSON.stringify(updateMajor);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const resUser = await updateProfile(userInfo.id, userData, config);
      if (userInfo.roleName === "Mentor") {
        const resMentor = await updateMentorInfo(userInfo.id, mentorData);
        if (updateMajor.majorId.toString() !== idMajor) {
          const resMajor = await addMajor(majorData, config);
          if (resMajor.status === 200) {
            const resDel = await deleteMajor(id);
          }
        }
      }
      setcheckEdit(!checkEdit);
      toast.success("Update Successful!");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const err = error.response.data.message;
        toast.error(err);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center mt-40 space-x-5">
        <Tabs defaultValue="account" className="w-[700px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Edit Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex space-y-2 space-x-10">
                <div className="space-y-5">
                  <div className="pr-6 pb-3 border-r-2 border-b-2">
                    Avatar
                    <Avatar className="h-40 w-40">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  {userInfo.roleName === "Mentor" ? (
                    <div className="pr-6 pb-3 border-r-2 border-b-2">
                      Degree
                      <Avatar className="h-40 w-40">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={accountProfile.fullname}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">DOB</Label>
                      <Input
                        id="password"
                        defaultValue={formatDate(accountProfile.dob)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">ID card</Label>
                      <Input
                        id="ID"
                        defaultValue={accountProfile.identityCard}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">Gender</Label>
                      <Input
                        id="Gender"
                        defaultValue={accountProfile.gender}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Email</Label>
                      <Input
                        id="Email"
                        defaultValue={accountProfile.email}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Phone</Label>
                      <Input
                        id="Phone"
                        defaultValue={accountProfile.phone}
                        disabled
                      />
                    </div>
                  </div>
                  {userInfo.roleName === "Mentor" ? (
                    <>
                      <div className="flex space-x-2 mb-3">
                        <div className="space-y-1">
                          <Label htmlFor="name">Academic Level</Label>
                          <Input defaultValue={mentor.academicLevel} disabled />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Work Place</Label>
                          <Input defaultValue={mentor.workPlace} disabled />
                        </div>
                      </div>
                      <div className="flex space-x-2 mb-3">
                        <div className="space-y-1">
                          <Label htmlFor="name">Skill</Label>
                          <Input defaultValue={mentor.skill} disabled />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Major</Label>
                          <Input defaultValue={major.majorName} disabled />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you are
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex space-y-2 space-x-10">
                <div className="space-y-5">
                  <div className="pr-6 pb-3 border-r-2 border-b-2">
                    Avatar
                    <Avatar className="h-40 w-40">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  {userInfo.roleName === "Mentor" ? (
                    <div className="pr-6 pb-3 border-r-2 border-b-2">
                      Degree
                      <Avatar className="h-40 w-40">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        onChange={(e) => {
                          handleChange("fullname", e);
                        }}
                        defaultValue={accountProfile.fullname}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">DOB</Label>
                      <Input
                        className="w-52"
                        type="date"
                        onChange={(e) => {
                          handleChange("dob", e);
                        }}
                        defaultValue={formatDate(accountProfile.dob)}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">ID card</Label>
                      <Input
                        id="ID"
                        onChange={(e) => {
                          handleChange("identityCard", e);
                        }}
                        defaultValue={accountProfile.identityCard}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">Gender</Label>
                      <Input
                        id="Gender"
                        onChange={(e) => {
                          handleChange("gender", e);
                        }}
                        defaultValue={accountProfile.gender}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <div className="space-y-1">
                      <Label htmlFor="name">Email</Label>
                      <Input
                        id="Email"
                        onChange={(e) => {
                          handleChange("email", e);
                        }}
                        defaultValue={accountProfile.email}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Phone</Label>
                      <Input
                        id="Phone"
                        onChange={(e) => {
                          handleChange("phone", e);
                        }}
                        defaultValue={accountProfile.phone}
                      />
                    </div>
                  </div>
                  {userInfo.roleName === "Mentor" ? (
                    <>
                      <div className="flex space-x-2 mb-3 ">
                        <div className="space-y-1">
                          <Label htmlFor="name">Academic Level</Label>
                          <Input
                            onChange={(e) => {
                              handleChangeMentor("academicLevel", e);
                            }}
                            defaultValue={mentor.academicLevel}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Work Place</Label>
                          <Input
                            onChange={(e) => {
                              handleChangeMentor("workPlace", e);
                            }}
                            defaultValue={mentor.workPlace}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2 mb-3">
                        <div className="space-y-1">
                          <Label htmlFor="name">Skill</Label>
                          <Input
                            onChange={(e) => {
                              handleChangeMentor("skill", e);
                            }}
                            defaultValue={mentor.skill}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Major</Label>
                          <select
                            onChange={(e) => {
                              e.preventDefault();
                              handleMajor(e.target.value);
                            }}
                            className="bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 "
                          >
                            {allMajor.length > 0 ? (
                              allMajor.map((item) => (
                                <option
                                  key={item.id}
                                  onChange={() => handleMajor(item.id)}
                                  value={item.id}
                                >
                                  {item.majorName}
                                </option>
                              ))
                            ) : (
                              <option value="">No majors available</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdate}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <Card className="w-[350px] h-auto">
          <CardHeader>
            <CardTitle>Subcription Orders</CardTitle>
            <CardDescription>
              {subcription.type === ""
                ? "You haven't subcribe the subcription yet"
                : "Detail of subcription in use:"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full h-auto items-center gap-4">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td>Type:</td>
                    <td>{subcription.type}</td>
                  </tr>
                  <tr>
                    <td>Terms:</td>
                    <td>${subcription.price} / Monthly</td>
                  </tr>
                  <tr>
                    <td>status:</td>
                    <td>{subcription.status}</td>
                  </tr>
                  <tr>
                    <td>Start Date:</td>
                    <td>{formatDate(subcription.startDate)}</td>
                  </tr>
                  <tr>
                    <td>Renewal Date:</td>
                    <td>{formatDate(subcription.endDate)}</td>
                  </tr>
                  <tr>
                    <td>Current Meeting:</td>
                    <td>{subcription.currentMeeting}</td>
                  </tr>
                  <tr>
                    <td>Current Question:</td>
                    <td>{subcription.currentQuestion}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-5">
        <div className="grid grid-cols-1 gap-6 w-[700px]">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
              <div>
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                  Transactions History
                </h6>
              </div>
            </div>

            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <div className="p-3">
                {transaction[0].type !== "" ? (
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs uppercase bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left flex items-center">
                              <span>No</span>
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              ammount
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              type
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              description
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              createTime
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-700">
                        {transaction.map((item, i) => (
                          <tr key={item.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-black">{i + 1}</div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {formatCurrency(item.ammount)}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{item.type}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {item.description}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {createDate(item.createTime)}
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
                            <span className="font-medium">
                              {transaction.length}
                            </span>{" "}
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
                ) : (
                  <>
                    <div className="text-center text-black">Not available</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
