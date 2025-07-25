import  "react";
import PieTrainChart from "./PieTrainChart";
import { useAppContext } from "../ui/AppContext";
interface CategoryComparison {
  category: "نیازها" | "خواسته ها" | "سایر";
  actual: number | undefined;
  supposed: number | undefined;
  difference: number | undefined;
  perce: number | undefined;
}
interface type {
  res: CategoryComparison;
}

export default function DataBox({ res }: type) {
  console.log("perce",res.perce);
  
  const {step}=useAppContext()


  return (
    <div
      dir="rtl"
      className={`${step===5&&"z-30 border-x-2  border-[#353535] bg-[#e9e7c5]"} bg-[#F9D87617] w-[358px] h-[81px] my-5 px-2 flex items-start justify-between`}
    >
      <div>
        <div className={`rounded-full my-2 w-[20px] h-[20px] ${res.category=="خواسته ها" ? "bg-[#A9A9A9]" :res.category=="نیازها"?"bg-[#353535]":"bg-[#fca311]"} `}></div>
      </div>
      <div className="my-2">
        {/* <div className="text-[12px] justify-start flex">درآمد این ماه:</div> */}
        <div className={`flex justify-start text-[14px] ${step===6&&"z-30 relative text-[#ffff]"}`}>{Number(res.actual).toLocaleString()}t</div>
        <div className="border-b-2 border-b-black w-[192px]"></div>
        <div className={`${step===7&&"z-30 relative "} flex justify-between`}>
          <p className={`${res.supposed&&res.actual&&res.supposed>res.actual? "text-[#1cd400]":"text-[#8C1C13]"}  text-[14px] font-bold`}>
            {Number(res.difference).toLocaleString()}t
          </p>
          <p className={`text-[10px] ${step===8&&"z-30 text-white "} mt-1 ${step===5&&"z-50 relative"}`}>
            {res.supposed && res.actual && res.actual < res.supposed
              ? "کمتر از بودجه"
              : "بیشتر از بودجه"}
          </p>
        </div>
      </div>
      <div className="chart relative bottom-1  w-[110px] ">
        <PieTrainChart
          category={res.category}
          amount={ Number(res.actual)<Number(res.supposed)?[Number(res.perce),"#fca311"]:[Number(res.difference),"#8C1C13"]}
          centerBox={res.category}
        ></PieTrainChart>
      </div>
    </div>
  );
}
