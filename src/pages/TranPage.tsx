/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TrainBox from "../components/Train/TrainBox";
import Train from "../components/Train/Tran";
import api from "../service/api";
import ChildFinancialData from "../components/Train/TypeTeain";
import ChartTrain from "../components/Train/ChartTrain";
import { MdOutlineWallet } from "react-icons/md";

export default function TranPage() {
  const childToken = localStorage.getItem("child_token_");
  const [income, setIncome] = useState(0);
const [hasData, setHasData] = useState(false);

  const [amounts, setAmounts] = useState<{
    needs: number;
    wants: number;
    others: number;
  }>({ needs: 0, wants: 0, others: 0 });

  const [dataTrain, setDataTrain] = useState<ChildFinancialData[]>([]);

  const trainRequest = async () => {
    try {
      const res = await api.get("/education", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
      setIncome(res.data.income);

      const data = res.data;

      const trainData: ChildFinancialData = {
        income: data.income,
        needs: data.needs,
        wants: data.wants,
        others: data.others,
        supposed_needs_amount: data.supposed_needs_amount,
        supposed_wants_amount: data.supposed_wants_amount,
        supposed_others_amount: data.supposed_others_amount,
        needs_percent: data.needs_percent,
        wants_percent: data.wants_percent,
        others_percent: data.others_percent,
        needs_difference: data.needs_difference,
        wants_difference: data.wants_difference,
        others_difference: data.others_difference,
      };

      setDataTrain([trainData]);

      setAmounts({
        needs: data.supposed_needs_amount,
        wants: data.supposed_wants_amount,
        others: data.supposed_others_amount,
      });
        setHasData(true);  // <-- این شرط مطلق

      console.log("response train", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    trainRequest();
  }, []);

  console.log("Train main:", dataTrain);

  return (
    <>
      { hasData ?(
        <div className="[&::-webkit-scrollbar]:w-0 h-full overflow-y-auto place-items-center content-center py-2">
          <div className="place-content-center place-items-center mt-20 mb-10">
            <TrainBox income={income} amounts={amounts}></TrainBox>
          </div>
          <div className="place-content-center place-items-center">
            <Train dataTrain={dataTrain}></Train>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <div className="bg-[#353535] h-[65%] top-0 py-20">
            <p className="text-white my-2">
              یکی از روش های بودجه بندی به این شکله که هزینه ماهیانه‌ات رو
              درصدبندی کنی تا ملاحظه بیشتری نسبت به خرج‌کردن داشته باشی. با این
              روش،نصف ماهیانه‌ات رو(50%) برای نیازهای اصلی و اساسی میذاری.مثل
              خریدن غذا،شهریه تحصیل و ... 30%باقی‌مونده ماهیانه‌ات رو به خواسته
              هات اختصاص میدی.مثل و ... 20%آخر رو هم اختصاص میدی به پس‌انداز و
              بدهی.اگر به کسی قرضی داری،این قسمت برای اینه.و اگر‌نه، میتونی این
              قسمت رو پس‌انداز کنی یا برای تفریح و یا هرمورد دیگه‌ای خرجش کنی.
            </p>
            <ChartTrain
              data={{ needs: 50, wants: 30, others: 20 }}
            ></ChartTrain>
          </div>
          <div className="place-items-center content-center h-[32%]">
          <div className="text-[50px] text-[#353535]">
                <MdOutlineWallet></MdOutlineWallet>
          </div>
           <p>
            هنوز ثبتی صورت نگرفته است
           </p>
          </div>
        </div>
      )}
    </>
  );
}
