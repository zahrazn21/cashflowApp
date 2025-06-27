import "react";
import InputCost from "../components/Cost registration/InputCost";
import { ReactNode, useEffect, useRef, useState } from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import api from "../service/api";
import moment from "moment-jalaali";
import { motion } from "framer-motion";
// import DatePicker from "react-modern-calendar-datepicker";
import { MdOutlinePayments  } from "react-icons/md";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Link } from "react-router-dom";
// import axios from "axios";
export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}
interface dataFilterType {
  title: "all" | "day" | "week" | "month";
  pertionTitle: string;
}
export default function CostRegistration() {
  const dataFilter: dataFilterType[] = [
    { title: "all", pertionTitle: "همه" },
    { title: "day", pertionTitle: "امروز" },
    { title: "week", pertionTitle: "این هفته" },
    { title: "month", pertionTitle: "این ماه" },
  ];
  const today = moment().format("jYYYY-jMM-jDD"); // تاریخ شمسی
  const data = [
    { title: "توضیحات", type: "text" },
    { title: "مقدار هزینه", type: "text" },
  ];

  // const handel = () => {
  //   const title = titleRef.current?.value || "";
  //   const cost = costRef.current?.value || "";

  //   if (title && cost && flash) {
  //     setDataDetail((prev) => [
  //       ...prev,
  //       {
  //         title,
  //         cost,
  //         flash,
  //       },
  //     ]);
  //   }

  //   if (titleRef.current) titleRef.current.value = "";
  //   if (costRef.current) costRef.current.value = "";

  // };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flash, setflash] = useState<ReactNode>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const childToken = localStorage.getItem("child_token_");

  const fetchData = async () => {
    try {
      const res = await api.get("costs", {
        headers: {
          Authorization: `Token ${childToken}`,
        },
      });
      setDataCost(res.data);
    } catch (err) {
      console.error("خطا در گرفتن داده‌ها:", err);
    }
  };

  const costs = async () => {
    // const childToken = localStorage.getItem("child_token_");

    const title = titleRef.current?.value || "";
    const cost = costRef.current?.value || 0;
    const data = {
      // id:35,
      amount: Number(cost),
      cate_choices: category, // یا "wants" بسته به انتخاب
      description: title,
      date: today,
      type: type,
      // child: 4,
    };
    if (title && cost) {
      try {
        const res = await api.post("costs", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${childToken}`,
          },
        });
        console.log("post data cost rigester:", res);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }

    if (titleRef.current) titleRef.current.value = "";
    if (costRef.current) costRef.current.value = "";
  };
  // const costs2 = async () => {
  //   const childToken = localStorage.getItem("child_token_");

  //   const title = titleRef.current?.value || "";
  //   const cost = costRef.current?.value || 0;
  //   const data = {
  //     // id:35,
  //     amount: Number(cost),
  //     cate_choices: category, // یا "wants" بسته به انتخاب
  //     description: title,
  //     date: today,
  //     type: type,
  //     // child: 4,
  //   };
  //   if (title && cost && flash) {
  //     setDataDetail((prev) => [
  //       ...prev,
  //       {
  //         title,
  //         cost,
  //         flash,
  //       },
  //     ]);
  //     try {
  //       const res = await api.post("costs", data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${childToken}`,
  //         },
  //       });
  //       console.log("res22", res);
  //       fetchData();

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   if (titleRef.current) titleRef.current.value = "";
  //   if (costRef.current) costRef.current.value = "";

  //   console.log("childToken", childToken);

  //   console.log("datas", data);
  // };

  const [category, setcategory] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setcategory(event.target.value);
  };

  const [type, setType] = useState("");

  const [dataCost, setDataCost] = useState<costType[] | null>(null);

  // const getDataCost = async () => {
  //   const childToken = localStorage.getItem("child_token_");
  //   console.log("⬇️ درخواست GET زده شد");

  //   try {
  //     const res = await api.get("costs", {
  //       headers: {
  //         Authorization: `Token ${childToken}`, // 👈 توکن رو بفرست
  //       },
  //     });
  //     console.log("get data cost:", res);
  //     setDataCost(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 100 && !isSticky) {
  //       setIsSticky(true);
  //     } else if (scrollTop <= 100 && isSticky) {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isSticky]);

  // const DriverBox=()=>{
  //   if(!isScrolled){
  //     setIsScrolled(true)

  //   }else{
  //     setIsScrolled(false)

  //   }
  // }
  const [clickFilterMenu, setClickFilterMenu] = useState(false);
  const filterMenu = () => {
    if (!clickFilterMenu) {
      setClickFilterMenu(true);
    } else {
      setClickFilterMenu(false);
    }
  };

  const [startY, setStartY] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartY(e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startY === null) return;

    const endY = e.clientY;

    if (startY - endY > 50) {
      // کشیدن از پایین به بالا
      setIsScrolled(true);
    } else if (endY - startY > 50) {
      setIsScrolled(false);
    }

    setStartY(null);
  };

  // const [costs2, setCosts2] = useState<costType[] | null>(null);
  const [filter, setFilter] = useState<"all" | "day" | "week" | "month">("all");

  useEffect(() => {
    fetchCosts(filter).then((data) => setDataCost(data));
  }, [filter]);

  const fetchCosts = async (filter: "day" | "week" | "month" | "all") => {
    try {
      const response = await api.get(`costs`, {
        params: { filter }, // تبدیل میشه به ?filter=day
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });

      setDataCost(response.data);
      console.log(response.data);
      return response.data; // ✅ این خیلی مهمه

      // setState(response.data) و ... اینجا برو سراغ استفاده از داده
    } catch (err) {
      console.error("خطا در گرفتن هزینه‌ها:", err);
    }
  };

  const [showFilter, setShowFilter] = useState("همه");
  const selectFilterHandel = (res: dataFilterType) => {
    setShowFilter(res.pertionTitle);
    setFilter(res.title);
    setClickFilterMenu(false);
  };


  // const [selectedDay, setSelectedDay] = useState(null);
  // useEffect(() => {
  //   const handleEnter = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       costs();
  //     }
  //   };

  //   window.addEventListener("keydown", handleEnter);
  //   return () => {
  //     window.removeEventListener("keydown", handleEnter);
  //   };
  // }, []);
  return (
    <div
      className="w-full h-full scroll-auto overflow-visible"
      onMouseUp={handleMouseUp}
    >
      <div className="grid bg-[oklch(0.96_0_0)] gap-8 h-[400px] place-content-center">
        <div className="grid gap-5 w-fit">
          <InputCost ref={titleRef} res={data[0]}></InputCost>
          <InputCost ref={costRef} res={data[1]}></InputCost>
        </div>

        <div className="flex justify-center">
          <div className="me-4 flex items-center">
            <label htmlFor="yellow-radio " className="mx-2 text-[9px]">
              درآمد
            </label>
            <input
              onClick={() => (
                setflash(
                  <div className="text-white">
                    <HiArrowTrendingUp></HiArrowTrendingUp>
                  </div>
                ),
                setType("income")
              )}
              name="default-radio"
              type="radio"
              id="yellow-radio"
              className="text-[#fca311] size-[20px] focus:ring-[#fca311] rounded-[15px]"
            />
          </div>
          <div className="me-4 flex items-center">
            <label htmlFor="yellow-radio " className="mx-2 text-[9px]">
              برآمد
            </label>
            <input
              onClick={() => (
                // (
                //   setFlag(
                //     prev=>[
                //       ...prev,true
                //     ]
                //   ),
                setflash(
                  <div className="text-[#fca311]">
                    <HiArrowTrendingDown></HiArrowTrendingDown>
                  </div>
                ),
                setType("expense")
              )}
              name="default-radio"
              type="radio"
              id="yellow-radio"
              className="text-[#fca311] size-[20px] focus:ring-[#fca311] rounded-[15px]"
            />
          </div>
        </div>

        <div className=" flex items-center w-full justify-evenly">
          <div className="date border-2 text-[10px] w-[64px] bg-white h-[32px] text-center flex items-center justify-center border-[#fca311] rounded-[5px]">
            {today}
          </div>

          {type == "income"}
          <div className="border-2   border-[#fca311] ring-0 rounded-[5px]">
            {type == "expense" ? (
              <select
                value={category}
                className="ring-0 text-center content-center border-none text-[10px] h-[30px] outline-0 rounded-[5px] py-0"
                onChange={handleChange}
                name=""
                id=""
              >
                <option className="h-[30px]" value="needs">
                  نیازها
                </option>
                <option className="h-[30px]" value="wants">
                  خواسته ها
                </option>
                <option className="h-[30px]" value="else">
                  سایر موارد
                </option>
              </select>
            ) : (
              <select
                value={category}
                className="ring-0 text-center content-center border-none text-[10px] h-[30px] outline-0 rounded-[5px] py-0"
                onChange={handleChange}
                name=""
                id=""
              >
                <option className="h-[30px]" value="parent">
                  پول تو جیبی
                </option>
                <option className="h-[30px]" value="part_time_job">
                  کار نیمه وقت
                </option>
                <option className="h-[30px]" value="other">
                  هدیه
                </option>
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <button
            onClick={costs}
            type="button"
            className="focus:outline-none  bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-5 py-2.5   dark:focus:ring-yellow-900"
          >
            ثبت
          </button>

          {/* <button
            onClick={costs}
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            cost
          </button> */}
        </div>
      </div>

      <div
        className={`" w-[450px] top-20 bg-[#353535]  h-full ${
          isScrolled &&
          "fixed top-15 transition delay-150 duration-300 ease-in-out"
        }  `}
      >
        {/* {isScrolled &&
        <div className="flex justify-center">
          <div className="bg-[#fca311] w-[100px] h-8 text-white rounded-t-xl content-center place-content-center place-items-center ">
          همه
          </div>
        </div>
        } */}

        <div className="relative">
          <div
            onClick={filterMenu}
            className={`border-[#fca311] border-2 absolute top-[-20px] right-[32%] z-[200]  w-[161px] bg-[#353535] text-white rounded-[8px] h-[39px] content-center place-content-center place-items-center`}
          >
            {showFilter}
          </div>
          <div className=" top-[20px] right-[145px] z-50 flex items-center justify-center absolute">
            {clickFilterMenu && (
              <div className="space-x-2 mb-4 bg-[#353535] rounded-[8px] border-2 border-[#fca311] w-[160px]">
                {dataFilter.map((res, index) => (
                  <div
                    key={index}
                    className="text-white select-none cursor-pointer"
                    onClick={() => selectFilterHandel(res)}
                  >
                    {res.pertionTitle}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            onMouseDown={handleMouseDown}
            className={`bg-[#353535]  top-0 relative   overflow-y-scroll scroll-pl-8 ${
              isScrolled ? "h-[670px]" : "h-[330px]"
            }   py-1  w-full
          [&::-webkit-scrollbar]:w-0`}
          >
            <ul className="h-full py-4">
              {dataCost && dataCost.length > 0 ? (
                dataCost.map((res, index) => (
                  <li
                    key={index}
                    dir="rtl"
                    className="flex my-1 select-none bg-[#F9D87617] h-[57px] w-full items-center justify-around text-white"
                  >
                    <div className="right flex items-center">
                      <div className="ml-1 w-[26px]">
                        {res.type === "income" ? (
                          <div className="text-white">
                            <HiArrowTrendingUp></HiArrowTrendingUp>
                          </div>
                        ) : (
                          <div className="text-[#fca311]">
                            <HiArrowTrendingDown></HiArrowTrendingDown>
                          </div>
                        )}
                      </div>
                      <div>{res.description}</div>
                    </div>
                    <div className="left">
                      <div className="text-[#fca311] font-display">
                        {res.amount}
                      </div>
                      <div className="text-[10px] date">{res.date}</div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="content-center place-content-center place-self-center h-full ">
                  <div className="text-white  text-[50px] flex items-center justify-center">
                    <MdOutlinePayments ></MdOutlinePayments >
                  </div>
                  <p className="text-white my-4">ثبتی صورت نگرفته‌ است</p>

                   { isScrolled&&<button
                    onClick={()=>setIsScrolled(false)}
                      type="button"
                      className="focus:outline-none text-[8px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-1 py-2.5   dark:focus:ring-yellow-900"
                    >
                      ثبت هزینه
                    </button>}
                </div>
              )}
            </ul>
          </div>
        </motion.div>

        {/* {isScrolled && (
          <div className="flex justify-center absolute top-[-32px] right-[40%]">
            <div className="bg-[#fca311] w-[100px] h-8 text-white rounded-t-xl content-center place-content-center place-items-center ">
              همه
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
