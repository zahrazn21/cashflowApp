import "react";
import Chart from "../components/DashboardCild/Chart";
// import { useAppContext } from "../components/ui/AppContext";
import GaugeChart from "../components/DashboardCild/GaugeChart";
import api from "../service/api";
import { useEffect, useState } from "react";
import RecentTransaction from "../components/DashboardCild/RecentTransactionsBox";
// import Chart from '../components/DashboardCild/Chart'
import { PiPiggyBankLight } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import { GoLightBulb } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiArchiveRegister } from "react-icons/gi";

export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}

export default function Dashboard() {
  const childToken = localStorage.getItem("child_token_");
  // const { category2 } = useAppContext();
  const [datacost, setdatacost] = useState<costType[]>([]);
  const [category2, setcategory2] = useState<number[]>([]);

  useEffect(() => {
    detailRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (datacost) {
      setCategory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datacost]);

  const detailRequest = async () => {
    try {
      const res = await api.get("costs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
      console.log("data", res.data);

      setdatacost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [wants, setwants] = useState<costType[]>([]);
  const [needs, setNeeds] = useState<costType[]>([]);
  const [Else, setElse] = useState<costType[]>([]);

  const setCategory = () => {
    const filteredWants = datacost.filter(
      (res) => res.cate_choices === "wants"
    );
    const filteredNeeds = datacost.filter(
      (res) => res.cate_choices === "needs"
    );
    const filteredElse = datacost.filter((res) => res.cate_choices === "else");

    setwants(filteredWants);
    setNeeds(filteredNeeds);
    setElse(filteredElse);
  };

  console.log("category", wants, needs, Else);

  const [PercentageWants, setPercentageWants] = useState(0);
  const [PercentageNeeds, setPercentageNeeds] = useState(0);
  const [PercentageElse, setPercentageElse] = useState(0);

  // const [openBox,setOpenBox]=useState("")
  const [sum, setsum] = useState(0);
  const Percentage = () => {
    const PercentageToTal = datacost.map((res) => parseInt(res.amount));
    const sum = PercentageToTal.reduce((acc, curr) => acc + curr, 0);
    const amountTotalWants = wants.map((res) => parseInt(res.amount));
    const amountTotalNeeds = needs.map((res) => parseInt(res.amount));
    const amountTotalElse = Else.map((res) => parseInt(res.amount));

    setsum(sum);
    setPercentageWants(
      Number(
        (
          (amountTotalWants.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );
    setPercentageNeeds(
      Number(
        (
          (amountTotalNeeds.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );
    setPercentageElse(
      Number(
        (
          (amountTotalElse.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );
  };

  useEffect(() => {
    if (wants.length || needs.length || Else.length) {
      Percentage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wants, needs, Else]);

  useEffect(() => {
    setcategory2([PercentageWants, PercentageNeeds, PercentageElse]);
  }, [PercentageWants, PercentageNeeds, PercentageElse]);

  const [resent, setResent] = useState([]);
  const [goals, setGoals] = useState([]);
  const [data, setData] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const dashboardRequest = async () => {
    try {
      const res = await api.get("/child/dashboard", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
      console.log("response", res);
      setResent(res.data.recent_costs);
      setGoals(res.data.top_goals);
      setData([
        { label: "روزانه", value: res.data.daily_total },
        { label: "هفتگی", value: res.data.weekly_total },
        { label: "ماهانه", value: res.data.monthly_total },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dashboardRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-15 [&::-webkit-scrollbar]:w-0 h-full  overflow-y-auto place-items-center content-center ">
      <div className="grid gap-10 ">
        <div className="bg-[#353535] my-5 w-[450px] h-[220px] place-content-center place-items-center">
          {
            sum&&sum>0 ?
          <Chart amount={category2} width={310} sum={sum}></Chart>

            :
            <div className="place-items-center content-center ">
          {/* <Chart amount={[10,10,10]} width={310} sum={0}></Chart> */}
            <div className="text-[50px] my-4 text-white">
              <FaChartPie></FaChartPie>
            </div>

             <p className="text-white">
            نموداری جهت نمایش وجود ندارد

             </p>
            </div>

          }
        </div>

        <div>
          <div className="place-content-center place-items-center">
            <div className="flex items-center">
              <p>تراکنش های اخیر</p>
              <p className="text-[#fca311] my-1 text-[24px]">
                <IoReceiptOutline></IoReceiptOutline>
              </p>
            </div>
            {resent && resent.length > 0 ? (
              <RecentTransaction detailRequest={resent}></RecentTransaction>
            ) : (
              <div className=" border-2 place-content-center place-items-center border-white overflow-auto py-2 [&::-webkit-scrollbar]:w-0 w-[400px] h-[271px] rounded-b-[30px] rounded-tl-[30px] bg-[#353535]">
           <div className="text-white text-[50px] my-4">
            <GiArchiveRegister></GiArchiveRegister>
            </div>              
                <p className="text-white">اخیرا ثبت تراکنشی صورت نگرفته</p>
              </div>
            )}{" "}
          </div>
        </div>

        <div className="place-content-center place-items-center">
          <div className="text-[#fca311] text-[40px]">
            <PiPiggyBankLight></PiPiggyBankLight>
          </div>
          <div className="bg-[#353535] w-[450px] h-[220px] place-content-center place-items-center">
            {goals && goals.length > 0 ? (
              <div className="flex items-center justify-between">
                {goals.map((res) => (
                  <GaugeChart res={res}></GaugeChart>
                ))}
              </div>
            ) : (
              <div className="text-white place-content-center place-items-center">
                <div className="text-white text-[50px]">
                  <GoGoal></GoGoal>
                </div>
                <p className="text-white my-5">
                هنوز هدفی ثبت نشده

                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="place-content-center place-items-center mb-10">
            <div className="flex items-center">
              <p>میانگین برآمد</p>
              <p className="text-[#fca311] my-1 text-[24px]">
                <GoLightBulb></GoLightBulb>
              </p>
            </div>
            <div className="bg-[#353535] w-[450px] h-[140px] place-content-center place-items-center p-2">
              <div className="flex items-center justify-between">
                {data.map((res) => (
                  <div className="place-content-center place-items-center mb-10">
                    <p className="text-white">{res.label}</p>
                    <div className="w-[130px] mx-2 h-[70px] rounded-[15px] bg-white text-[#fca311] place-items-center place-content-center my-1">
                      {res.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
