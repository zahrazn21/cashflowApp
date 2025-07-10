import "react";
import DataBox from "./DataBox";
import Video from "./TrainVideo";
import ChildFinancialData from "./TypeTeain";
import { useAppContext } from "../ui/AppContext";

interface propType {
  dataTrain: ChildFinancialData[];
}
interface CategoryComparison {
  category: "نیازها" | "خواسته ها" | "سایر";
  actual: number | undefined;
  supposed: number | undefined;
  difference: number | undefined;
  perce: number | undefined;
}

export default function Train({ dataTrain }: propType) {
  console.log("Train Databox dataTrain", dataTrain);

  const comparisonArray: CategoryComparison[] = [];

  dataTrain.forEach((item) => {
    comparisonArray.push(
      {
        category: "نیازها",
        actual: item.needs,
        supposed: item.supposed_needs_amount,
        difference: item.needs_difference,
        perce: item.needs_percent,
      },
      {
        category: "خواسته ها",
        actual: item.wants,
        difference: item.wants_difference,
        supposed: item.supposed_wants_amount,
        perce: item.wants_percent,
      },
      {
        category: "سایر",
        actual: item.others,
        supposed: item.supposed_others_amount,
        difference: item.others_difference,
        perce: item.others_percent,
      }
    );
  });

  const {step}=useAppContext()
  return (
    <div className={`relative`}>
      <div className={`relative w-[360px] h-[504px]  border-[#353535] place-content-center place-items-center rounded-[46px] bg-white border-[3px]`}>
        {comparisonArray &&
          comparisonArray.map((res) => (
           <div className={` ${step===5&&"z-30 relative"} `}>
              <DataBox res={res}></DataBox>
            </div>
          ))}

        <p className="text-[14px]">
          این جا یک سری ویدیو خوبه برای تو دوست عزیزم تا یاد بگیری پول برای تموم
          کردن نیست
        </p>
        <div className="flex justify-between w-[100%] px-4 my-5">
          <Video
            href="https://youtu.be/woctJskDuXs?si=OgG1knOtjMt9ryZJ"
            title='50/30/20'
          ></Video>
          <Video
            href="https://youtu.be/qx6xqOp3jGY?si=2o4PSCAMqd3Vswx3"
            title="هوش مالی "
          ></Video>
          <Video
            href="https://www.aparat.com/v/q651ixv"
            title="مدیریت پول"
          ></Video>
        </div>
      </div>
      <div className={`${step===5&&"z-30"} absolute bg-[#353535] items-center flex justify-center shadow-2xl z-20 w-[94.43395233154297px] h-[31.669921875px] rounded-[46px] border-white border-2 top-[-12px] left-[37%]`}>
        <p className="text-[#fca311] place-content-center text-[14px]">
          بررسی این ماه
        </p>
      </div>
    </div>
  );
}
