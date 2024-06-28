"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
("@/components/ui/select");
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/lib/hooks/useUserStore";
import { getUserSubcription } from "@/lib/service/subcriptionService";
import { getProfile, updateProfile } from "@/lib/service/profileService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const [checkEdit, setcheckEdit] = useState(false);

  const [subcription, setsubcription] = useState({
    status: "",
    startDate: "",
    endDate: "",
    currentQuestion: 0,
    currentMeeting: 0,
    type: "",
    price: 0,
  });

  //update form
  const [formData, setformData] = useState({
    fullname: "",
    password: "",
    email: "",
    avatar: "",
    gender: "",
    identityCard: "",
    phone: "",
  });

  //userprofile
  const [accountProfile, setaccountProfile] = useState({
    email: "",
    fullname: "",
    avatar: "",
    gender: "",
    identityCard: "",
    phone: "",
    password: "",
  });

  const { isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const formatDate = (stringDate: string) => {
    const datePart = stringDate.split("T")[0];

    // Create a Date object from the date string
    const date = new Date(datePart);

    // Get the day, month (0-indexed!), and year
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile(userInfo.id);
      // console.log(res.data.data);
      const data = res.data.data;
      setaccountProfile((prevState) => ({
        ...prevState,
        ...data, // Spread the response data to overwrite existing properties
      }));
      setformData((prevState) => {
        // Destructure the data object to extract specific fields
        const {
          email,
          fullname,
          avatar,
          gender,
          identityCard,
          phone,
          password,
        } = data;

        // Update formData with destructured properties
        return {
          ...prevState,
          email,
          fullname,
          avatar,
          gender,
          identityCard,
          phone,
          password,
        };
      });
      // Subcription
      try {
        const response = await getUserSubcription(userInfo.id);
        const subData = response.data.data[0];
        console.log(subData);

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
        subcriptionData.startDate = formatDate(subData.startDate);
        subcriptionData.endDate = formatDate(subData.endDate);
        subcriptionData.price = subData.subcription.subcriptionPrice;
        console.log(subcriptionData);
        setsubcription(subcriptionData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [checkEdit]);

  const handleChange = (key: any, e: any) => {
    setformData((prevState) => ({
      ...prevState,
      [key]: e.target.value, // Use computed property name for dynamic updates
    }));
  };

  const handleUpdate = async () => {
    const jsonData = JSON.stringify(formData);
    const config = {
      headers: { "Content-Type": "application/json" }, // Set the Content-Type header
    };
    try {
      const res = await updateProfile(userInfo.id, jsonData, config);
      console.log(res);
      setcheckEdit(!checkEdit);
      toast.success("Update Successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-40 space-x-5">
        <Tabs defaultValue="account" className="w-[700px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Edit Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                {/* <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription> */}
              </CardHeader>
              <CardContent className="flex space-y-2 space-x-10">
                <div className="pr-6 border-r-2">
                  <Avatar className="h-40 w-40">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={accountProfile.fullname}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        defaultValue={accountProfile.password}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
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
                  <div className="flex space-x-2">
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
                  {/* <div className="flex space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Academic Level</Label>
                      <Input
                        id="Email"
                        defaultValue={accountProfile.email}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Work Place</Label>
                      <Input
                        id="Phone"
                        defaultValue={accountProfile.phone}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Skill</Label>
                      <Input
                        id="Email"
                        defaultValue={accountProfile.email}
                        disabled
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Major</Label>
                      <Input
                        id="Phone"
                        defaultValue={accountProfile.phone}
                        disabled
                      />
                    </div>
                  </div> */}
                </div>
              </CardContent>
              {/* <CardFooter>
                <Button>Save changes</Button>
              </CardFooter> */}
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
                <div className="pr-6 border-r-2">
                  <Avatar className="h-40 w-40">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex space-x-2">
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
                      <Label htmlFor="name">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        onChange={(e) => {
                          handleChange("password", e);
                        }}
                        defaultValue={accountProfile.password}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
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
                  <div className="flex space-x-2">
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
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdate}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <Card className="w-[350px] mt-10">
          <CardHeader>
            <CardTitle>Subcription Orders</CardTitle>
            <CardDescription>
              {subcription.type === ""
                ? "You haven't subcribe the subcription yet"
                : "Detail of subcription in use:"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <table className="table-auto">
                {/* <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                  </tr>
                </thead> */}
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
                    <td>{subcription.startDate}</td>
                  </tr>
                  <tr>
                    <td>Renewal Date:</td>
                    <td>{subcription.endDate}</td>
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
          {/* <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter> */}
        </Card>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
