import "react";
import ChartTrain from "./ChartTrain";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../ui/AppContext";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";

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

  console.log("others", amounts.others);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGuide, setIsOpenGuide] = useState(false);
  const { step, setStep } = useAppContext();

  console.log("step", step);

  return (
    <div className="relative w-[450px]">
      <div className="relative place-items-center">
        <div className="relative w-[360px] h-[224px]  border-[#353535] place-content-center place-items-center rounded-[46px] bg-white border-[3px]">
          <div className=" chart flex items-center justify-between " dir="rtl">
            <div className="">
              {amounts &&
              amounts.needs != 0 &&
              amounts.others != 0 &&
              amounts.wants != 0 ? (
                <ChartTrain data={amounts}></ChartTrain>
              ) : (
                <ChartTrain
                  data={{ needs: 10, wants: 10, others: 10 }}
                ></ChartTrain>
              )}
            </div>
            <div className={``}>
              <div className="text-[12px]  mb-3 flex justify-start">
                درآمد این ماه:
              </div>
              <div>
                <div
                  className={`mb-2   ${
                    step === 1 && "z-40 text-white relative"
                  }`}
                >
                  {income.toLocaleString()}t
                </div>
                <div className="border-b-2  border-b-black w-[120px]"></div>
              </div>
            </div>
          </div>
          <div className="circles mt-5 flex items-center justify-evenly w-[100%] ">
            <div className={`flex ${step === 4 && "relative z-40"}`}>
              <p
                className={`text-[12px] mx-1 ${
                  step === 4 && "relative z-40 text-white"
                }`}
              >
                {amounts.others && amounts.others.toLocaleString()}t
              </p>
              <div className="rounded-full w-[15px] h-[15px] bg-[#fca311]"></div>
            </div>
            <div className={`flex  ${step === 3 && "relative z-40"}`}>
              <p
                className={`text-[12px] mx-1 ${
                  step === 3 && "relative z-40 text-white"
                }`}
              >
                {amounts.wants && amounts.wants.toLocaleString()}t
              </p>
              <div className="rounded-full w-[15px] h-[15px] bg-[#A9A9A9]"></div>
            </div>
            <div className={`flex ${step === 2 && "relative z-40"}`}>
              <p
                className={`text-[12px] mx-1 ${
                  step === 2 && "relative z-40 text-white"
                }`}
              >
                {amounts.needs.toLocaleString()}t
              </p>
              <div className="mx-1  rounded-full w-[15px] h-[15px] bg-[#353535]"></div>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-center items-center bg-[#353535] shadow-2xl z-20 w-[94.43395233154297px] h-[31.669921875px] rounded-[46px] border-white border-2 top-[-12px] left-[40%]">
          <p className="text-[#fca311] text-[14px]">بودجه بندی</p>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="absolute cursor-pointer flex justify-center items-center top-[-35px] right-[15px]"
      >
        <p className="text-[#fca311] text-[30px] ">
          <FaQuestionCircle />
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              key="deleteModal" // کلید بده تا درست کار کنه
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2, rotate: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative bg-white w-[400px] dark:bg-gray-700 rounded-lg shadow-lg  max-w-lg p-6">
                {/* Header with close button */}
                <div
                  dir="rtl"
                  className="flex justify-between  items-center mb-4 border-b border-gray-200 dark:border-gray-600 pb-2"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    راهنما
                  </h2>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-900  hover:bg-gray-200  rounded-lg p-1 focus:outline-none active:border-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-10">آیا به راهنما نیاز دارید؟</p>
                {/* Modal body */}
                <div></div>
                <div
                  dir="rtl"
                  className=" dark:text-gray-300   flex items-center justify-evenly
                            leadig-relaxed"
                >
                  <button
                    className="bg-emerald-900 rounded-xl text-white w-[110px]"
                    onClick={() => (
                      setIsOpen(false), setIsOpenGuide(true), setStep(1)
                    )}
                  >
                    بله
                  </button>
                  <button
                    className="bg-red-700 rounded-xl text-rose-50 w-[110px]"
                    onClick={() => setIsOpen(false)}
                  >
                    خیر
                  </button>
                  {/* <p>❤️❤️❤️😊🫶😊❤️❤️❤️</p> */}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenGuide && step < 10 && (
          <div className="fixed inset-0   z-30 flex items-center justify-center bg-black/50">
            <motion.div
              key="deleteModal" // کلید بده تا درست کار کنه
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2, rotate: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative h-full">
                <div
                  dir="rtl"
                  className="flex items-center h-full justify-around mb-6 relative w-[450px] bottom-[-355px]"
                >
                  <button
                    className="bg-[#fca311] rounded-xl text-white w-[110px]"
                    onClick={() => (setStep(step + 1) )}
                  >
                    بعدی
                  </button>
                 {step>=2&&<button
                    className="bg-[#fca311]  rounded-xl text-white w-[110px]"
                    onClick={() => setStep(step - 1)}
                  >
                    قبلی
                  </button>}

                  {/* <p>❤️❤️❤️😊🫶😊❤️❤️❤️</p> */}
                </div>
              </div>
            </motion.div>
            <div className="relative ">
              {step === 1 && (
                <div className="relative">
                  <div className="w-[180px] px-2  py-1 rounded-[8px] top-[-305px] right-65  bg-amber-50 z-50 absolute ">
                    <p>
                      در این قسمت در آمد این ماه شما نشان داده شده است که به سه
                      بخش تقسیم شده
                    </p>{" "}
                  </div>
                  <p className="text-white absolute right-97 top-[-195px] text-[30px]">
                    <BsArrowReturnRight />
                  </p>
                </div>
              )}
              {step === 2 && (
                <div className="w-[160px]   py-1 rounded-[8px] top-[-140px] right-10 h-8 bg-amber-50 z-50 absolute ">
                  <p>پنجاه درصد برای نیازها</p>
                </div>
              )}
              {step === 3 && (
                <div className="w-[200px]   py-1 rounded-[8px] top-[-140px] right-30 h-8 bg-amber-50 z-50 absolute ">
                  <p>سی درصد برای خواسته ها</p>
                </div>
              )}
              {step === 4 && (
                <div className="w-[230px]   py-1 rounded-[8px] top-[-140px] right-50 h-8 bg-amber-50 z-50 absolute ">
                  <p>و بیست درصد برای سایر موارد</p>
                </div>
              )}
              {step === 5 && (
                <div className="w-[240px]   py-1 rounded-[8px] top-[-150px] right-25  bg-amber-50 z-50 absolute ">
                  <p>
                    در این بخش برای هر دسته بندی ،مقداری ک خرج کرده اید را با
                    مقداری که طبق بودجه بندی قرار بود خرج کنید مقایسه میشود
                  </p>
                </div>
              )}

              {step === 6 && (
                <div className="relative">
                  <div className="w-[240px]   py-1 rounded-[8px] top-[-20px] right-10  bg-amber-50 z-50 absolute ">
                    <p>اینجا مقداری ک خرج شده را نمایش میدهد</p>
                  </div>
                  <p className="text-white absolute right-12 top-9 text-[30px]">
                    <BsArrowReturnLeft />
                  </p>
                </div>
              )}

              {step === 7 && (
                <div className="relative">
                  <div className="w-[240px]   py-1 rounded-[8px] top-[20px] right-10  bg-amber-50 z-50 absolute ">
                    <p>و اینجا مقداری ک باقی مانده</p>
                  </div>
                  <p className="text-white absolute right-12 top-14 text-[30px]">
                    <BsArrowReturnLeft />
                  </p>
                </div>
              )}
              {step === 8 && (
                <div className="relative">
                  <div className="w-[240px]   py-1 rounded-[8px] top-[-50px] right-30 bg-amber-50 z-50 absolute ">
                    <p>
                      اگر مقداری ک خرج کرده اید بیشتر از بودجه باشد مینویسد
                      بیشتر از بودجه و اگر کمتر خرج کرده باشید مینویسد کمتر از
                      بودجه
                    </p>
                  </div>
                  <p className="text-white absolute right-70 top-15 text-[30px]">
                    <BsArrowReturnRight />
                  </p>
                </div>
              )}
              {step === 9 && (
                <div className="relative">
                  <div className="w-[240px]   py-5 rounded-[8px] top-[-50px] right-25 bg-amber-50 z-50 absolute ">
                    <p>آموزش به پایان رسید</p>
                    <p>با تشکر از همراهی شما</p>
                    <p className="my-2">(●'◡'●)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
