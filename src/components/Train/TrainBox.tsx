import  "react";
import ChartTrain from "./ChartTrain";

interface type {
  needs: number;
  wants: number;
  others: number;
}
interface propType {
  income: number;
  amounts: type;
}

export default function TrainBox({ income, amounts }: propType) {
  console.log("amounts:", amounts);

  console.log("others",amounts.others);
  
  return (
    <div className="relative">
      <div className="relative w-[360px] h-[224px]  border-[#353535] place-content-center place-items-center rounded-[46px] bg-white border-[3px]">
        <div className=" chart flex items-center justify-between " dir="rtl">
          <div className="">
            {amounts && amounts.needs!=0&&amounts.others!=0&&amounts.wants!=0?
                        <ChartTrain data={amounts}></ChartTrain>

            :
                        <ChartTrain data={{needs:10,wants:10,others:10}}></ChartTrain>

            }
          </div>
          <div className="">
            <div className="text-[12px]  mb-3 flex justify-start">
              درآمد این ماه:
            </div>
            <div>
              <div className="mb-2">{income.toLocaleString()}t</div>
              <div className="border-b-2  border-b-black w-[120px]"></div>
            </div>
          </div>
        </div>
        <div className="circles mt-5 flex items-center justify-evenly w-[100%] ">
          <div className="flex  justify-center">
            <p className="text-[12px] mx-1">{amounts.needs.toLocaleString()}t</p>
            <div className="mx-1  rounded-full w-[15px] h-[15px] bg-[#353535]"></div>
          </div>
          <div className="flex ">
            <p className="text-[12px] mx-1 ">
              {amounts.others && amounts.others.toLocaleString()}t
            </p>
            <div className="rounded-full w-[15px] h-[15px] bg-[#fca311]"></div>
          </div>
          <div className="flex ">
            <p className="text-[12px] mx-1">
              {amounts.wants && amounts.wants.toLocaleString()}t
            </p>
            <div className="rounded-full w-[15px] h-[15px] bg-[#A9A9A9]"></div>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-center items-center bg-[#353535] shadow-2xl z-20 w-[94.43395233154297px] h-[31.669921875px] rounded-[46px] border-white border-2 top-[-12px] left-[37%]">
        <p className="text-[#fca311] text-[14px]">بودجه بندی</p>
      </div>
    </div>
  );
}
