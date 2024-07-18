"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { getAllTransaction } from "@/lib/service/adminService";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = () => {
  const [data, setdata] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTransaction("", "");
      // console.log(response);
      const transactionData = response.data.data;
      const dates: string[] = [];
      const amount: number[] = [];
      const dailyAmounts: { date: string; amount: number }[] = [];
      // console.log(transactionData);
      transactionData.forEach((transaction: any) => {
        const date = transaction.createTime.slice(0, 10); 
        if (!dates.includes(date)) {
          dates.push(date);
        }
        const existingEntry = dailyAmounts.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.amount += transaction.ammount;
        } else {
          dailyAmounts.push({ date, amount: transaction.ammount });
        }
      });
      dailyAmounts.forEach((dailyAmount: any) => {
        amount.push(dailyAmount.amount); 
      });
      // console.log(dates);
      // console.log(dailyAmounts);
      // console.log(amount);
      setdata({ labels: dates, datasets: [{ label: "Daily Amount", data: amount }] });
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-[600px]">
      {/* <h1>Example 1: Line Chart</h1> */}
      <Line data={data} />
    </div>
  );
};
export default LineChart;
