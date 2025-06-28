/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "react";
import Chart from "../components/DashboardCild/Chart";
// import { useAppContext } from "../components/ui/AppContext";
import api from "../service/api";
import { useEffect, useState } from "react";
import RecentTransaction from "../components/DashboardCild/RecentTransactionsBox";
// import Chart from '../components/DashboardCild/Chart'
// import { PiPiggyBankLight } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import { GoLightBulb } from "react-icons/go";
import ChartBar from "../components/ParentDashboard/AddUsers/ChartBar";
import { useChild } from "../components/ParentDashboard/AddUsers/ChildProvider";
import { FaChartPie } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineInsertChart } from "react-icons/md";

export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}
export interface CostItem {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string; // فرمت شمسی
}

export interface Child {
  id: number;
  username: string;
}

export interface IncomeExpense {
  income: number;
  expense: number;
}

export interface DashboardData {
  child_id: number;
  child_username: string;
  parent_id: number;
  income: number;
  recent_costs: costType[];
  daily_total: number;
  weekly_total: number;
  monthly_total: number;
  persian_today: string;
  savings: number;
  needs: number;
  wants: number;
  others: number;
  children: Child[];
  months: string[];
  income_expense_data: IncomeExpense[];
}

export interface DashboardResponse {
  data: DashboardData;
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
  config: {
    method: string;
    url: string;
    baseURL: string;
    headers: {
      [key: string]: string;
    };
    [key: string]: any;
  };
  request: any;
}

export interface DashboardDataChild {
  child_id: number;
  child_username: string;
  parent_id: number;
  income: number;
  recent_costs: costType[];
  daily_total: number;
  weekly_total: number;
  monthly_total: number;
  persian_today: string;
  savings: number;
  needs: number;
  wants: number;
  others: number;
  children: Child[];
  months: string[]; // ["فروردین", "اردیبهشت", ...]
  income_expense_data: IncomeExpense[];
}

export default function ParentDashboard() {
  const parentToken = localStorage.getItem("parent_token");
  const [recentTransactin, setRecentTransactin] = useState<costType[] | null>();
  const [wantNeedOther, setWantNeedOther] = useState<number[]>();
  const [months, setmonths] = useState<string[]>();
  const { selectedChild, setChildName, setSelectedChild, setStepChild } =
    useChild();
  const [footer, setFotter] = useState<{ title: string; value: number }[]>();
  const [barData, setBarDate] = useState<IncomeExpense[]>();

  // const [child, setChild] = useState<Child | null>(null); // برای انتخاب فعلی

  const dataParentDashboard = async () => {
    try {
      const response = await api.get<DashboardData>("/parent/dashboard", {
        headers: {
          Authorization: `Token ${parentToken}`,
        },
      });

      const data = response.data;
      setRecentTransactin(data.recent_costs);
      setWantNeedOther([data.wants, data.needs, data.others]);
      setFotter([
        { title: "پس انداز", value: data.savings },
        { title: "نیازها", value: data.needs },
        { title: "خواسته ها", value: data.wants },
        { title: "سایر", value: data.others },
      ]);
      setChildName(data.children);
      console.log("res1:", response);

      // 👇 انتخاب فرزند اول
      if (data.children && data.children.length > 0) {
        setSelectedChild(data.children[0]); // پیش‌فرض: Robin
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DATAselectChild = async () => {
    if (!selectedChild) return;

    console.log("id:", selectedChild?.id);

    try {
      const response = await api.post<DashboardDataChild>(
        "/parent/dashboard",
        {
          child_id: selectedChild?.id, // بدنه درخواست
        },
        {
          headers: {
            Authorization: `Token ${parentToken}`,
          },
        }
      );

      const data = response.data;
      setRecentTransactin(data.recent_costs);
      setWantNeedOther([data.wants, data.needs, data.others]);
      setFotter([
        { title: "پس انداز", value: data.savings },
        { title: "نیازها", value: data.needs },
        { title: "خواسته ها", value: data.wants },
        { title: "سایر", value: data.others },
      ]);

      setBarDate(data.income_expense_data);
      setmonths(data.months);
      console.log("response:", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataParentDashboard();
    setStepChild(1);
  }, []);

  useEffect(() => {
    DATAselectChild();
  }, [selectedChild]);

  // const [select, setSelect] = useState(false);

  // const selectChild = () => {
  //   if (!select) {
  //     setSelect(true);
  //   } else {
  //     setSelect(false);
  //   }
  // };

  // const handelSelected=(res:Child)=>{
  //       setChild(res)
  //       setSelect(false)

  // }
  console.log("barData",barData);
  
  return (
    <div className="mt-15 [&::-webkit-scrollbar]:w-0 h-screen  overflow-y-auto place-items-center content-center ">
      <div className="grid gap-10 ">
        <div className="bg-[#353535] my-5 w-[450px] h-[220px] place-content-center place-items-center">
          {wantNeedOther && wantNeedOther[0]!=0 || wantNeedOther&&wantNeedOther[1]!=0 || wantNeedOther&&wantNeedOther[2]!=0 ? (
            <Chart amount={wantNeedOther} width={310}></Chart>
          ) : (
            <div className="place-items-center content-center ">
              {/* <Chart amount={[10,10,10]} width={310} sum={0}></Chart> */}
              <div className="text-[50px] my-4 text-white">
                <FaChartPie></FaChartPie>
              </div>

              <p className="text-white">نموداری جهت نمایش وجود ندارد</p>
            </div>
          )}
        </div>

        <div>
          <div className="place-content-center place-items-center">
            <div className="flex items-center">
              <p>تراکنش های اخیر</p>
              <p className="text-[#fca311] my-1 text-[24px]">
                <IoReceiptOutline></IoReceiptOutline>
              </p>
            </div>

            {recentTransactin && recentTransactin.length > 0 ? (
              <RecentTransaction
                detailRequest={recentTransactin}
              ></RecentTransaction>
            ) : (
              <div className=" border-2 place-content-center place-items-center border-white overflow-auto py-2 [&::-webkit-scrollbar]:w-0 w-[400px] h-[271px] rounded-b-[30px] rounded-tl-[30px] bg-[#353535]">
                <div className="text-white text-[50px] my-4">
                  <GiArchiveRegister></GiArchiveRegister>
                </div>
                <p className="text-white">اخیرا ثبت تراکنشی صورت نگرفته</p>
              </div>
            )}
          </div>
        </div>
        {/* <div className="place-content-center place-items-center">
          <div className="text-[#fca311] text-[40px]">
            <PiPiggyBankLight></PiPiggyBankLight>
          </div>
        </div> */}
        <div>
          <div className="place-content-center place-items-center mb-10">
            <div className="flex items-center">
              <p>میانگین برآمد</p>
              <p className="text-[#fca311] my-1 text-[24px]">
                <GoLightBulb></GoLightBulb>
              </p>
            </div>
            <div className="bg-[#353535] w-[450px] h-fit mb-[70px]  place-content-center place-items-center p-2">
              {footer && footer.length > 0 ? (
                <div className=" columns-2">
                  {footer &&
                    footer.map((res) => (
                      <div className="place-content-center place-items-center  aspect-square/2 ">
                        <p className="text-white">{res.title}</p>
                        <div className="w-[130px] mx-2 h-[70px] rounded-[15px] bg-white text-[#fca311] place-items-center place-content-center my-1">
                          {res.value}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-[200px] place-items-center content-center">
                  <div className="text-white text-[50px] my-4">
                    <TbReport></TbReport>
                  </div>
                  <p className="text-white place-items-center content-center">
                    ثبتی وجود ندارد
                  </p>
                </div>
              )}
            </div>
              <div className="flex items-center">
              <p>
                تراکنش های سه ماه اخیر
                 </p>
              <p className="text-[#fca311] my-1 text-[24px]">
                <MdOutlineInsertChart></MdOutlineInsertChart>
              </p>
            </div>
            <div className="bg-[#353535] w-[450px] h-fit place-content-center place-items-center p-2">
              {barData && barData[0].income!=0 || barData && barData[1].income!=0 ||barData && barData[2].income!=0  ||
              barData && barData[0].expense!=0||barData && barData[1].expense!=0||barData && barData[2].expense!=0
              ? (
                <ChartBar data={barData} months={months}></ChartBar>
              ) : (
                <div className="place-items-center content-center h-[200px]">
                  <div className="text-white text-[50px] my-4">
                    <FaChartBar></FaChartBar>
                  </div>
                  <p className="text-white">نموداری جهت نمایش وجود ندارد</p>
                </div>
              )}
            </div>
            {/* <div className="bg-[#fca311] py-5 w-[450px] h-[90px] place-content-center place-items-center px-2 fixed  bottom-0">
              <div className="cursor-pointer select-none" onClick={selectChild}>
                انتخاب فرزند
              </div>
              {select && (
                <ul className="w-[160px] h-fit gap-2 grid py-4 text-[15px] absolute bg-[#353535] mx-1 border-2 border-[#fca311] rounded-[30px] right-[145px]   bottom-20">
                  {childName?.map((res) => (
                    <li
                      className="bg-[#46433b] my-1 text-white cursor-pointer"
                      onClick={() => handelSelected(res)}
                    >
                      {res.username}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
