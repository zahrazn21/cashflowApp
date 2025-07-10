/* eslint-disable react-hooks/exhaustive-deps */
import "react";
import InputCost from "../components/Cost registration/InputCost";
import { ReactNode, useEffect, useRef, useState } from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import api from "../service/api";
// import moment from "moment-jalaali";
import { AnimatePresence, motion } from "framer-motion";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";

// import DatePicker from "react-modern-calendar-datepicker";
import { MdOutlinePayments } from "react-icons/md";
// import DatePicker from "react-multi-date-picker";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Link } from "react-router-dom";
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
  const [deletId, setDeletId] = useState(0);
  const [editInform, setEditInform] = useState<{
    date: string;
    description: string;
    amount: string;
    id: number;
    cate_choices: string;
    type: string;
  }>({
    date: "",
    description: "",
    amount: "",
    id: 0,
    cate_choices: "",
    type: "",
  });
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [selectedDateEdit, setSelectedDateEdit] = useState<
    DateObject | null | string
  >(editInform.date);
  const dataFilter: dataFilterType[] = [
    { title: "all", pertionTitle: "همه" },
    { title: "day", pertionTitle: "امروز" },
    { title: "week", pertionTitle: "این هفته" },
    { title: "month", pertionTitle: "این ماه" },
  ];
  // const today = moment().format("jYYYY-jMM-jDD"); // تاریخ شمسی
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
  const [, setflash] = useState<ReactNode>(null);
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

  const date = selectedDate && selectedDate;
  const costs = async () => {
    // const childToken = localStorage.getItem("child_token_");

    const title = titleRef.current?.value || "";
    const cost = costRef.current?.value || 0;
    const data = {
      // id:35,
      amount: Number(cost),
      cate_choices: category, // یا "wants" بسته به انتخاب
      description: title,
      date: date?.format("YYYY-MM-DD"),
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

  const deleteCost = async (id: number) => {

    try {
      const res = await api.delete(`costs/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });

      console.log("delet cost response:", res.data);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCost = async (id: number) => {
    try {
      const res = await api.patch(`costs/${id}/`, editInform, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
      console.log("update cost response:", res);
      fetchData(); // برای رفرش لیست
      setIsOpen(false);
      console.log("update cost 4545:", dataCost);
    } catch (err) {
      console.log(err);
      alert("ویرایش هزینه با خطا مواجه شد!");
    }
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

  const [calendar, setCalendar] = useState(false);
  const [calendarEdit, setCalendarEdit] = useState(false);

  const showCalendar = () => {
    if (calendar === false) {
      setCalendar(true);
    } else {
      setCalendar(false);
    }
  };
  const showCalendarEdit = () => {
    if (calendarEdit === false) {
      setCalendarEdit(true);
    } else {
      setCalendarEdit(false);
    }
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelet, setIsOpenDelet] = useState(false);

  return (
    <div
      className="w-full h-full scroll-auto overflow-visible"
      onMouseUp={handleMouseUp}
    >
      <div className="grid bg-[oklch(0.96_0_0)] gap-8 h-[400px] place-content-center">
        <div className="grid gap-5 w-fit">
          <InputCost ref={costRef} res={data[1]}></InputCost>
          <InputCost ref={titleRef} res={data[0]}></InputCost>
        </div>

        <div className="flex justify-center">
          <div className="me-4 flex items-center">
            <label htmlFor="yellow-radio " className="mx-2 text-[9px]">
              درآمد
            </label>
            <input
              onClick={() => (
                setcategory("parent"),
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
                setcategory("needs"),
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
          <div
            className="date border-2 text-[10px] w-[64px] bg-white h-[32px] text-center flex items-center justify-center border-[#fca311] rounded-[5px] cursor-pointer"
            onClick={showCalendar}
          >
            {selectedDate && selectedDate.format()}
          </div>
          {calendar && (
            <div className={`absolute z-50 `}>
              <Calendar
                value={selectedDate}
                onChange={(datenew: DateObject | null) => {
                  setSelectedDate(datenew);
                  setCalendar(false);
                  // console.log("تاریخ انتخاب‌شده:", datenew&&datenew.format());
                }}
                calendar={persian}
                locale={persian_fa}
              />
              <p
                className=" absolute top-0  right-0 cursor-pointer text-red-600 rounded-full  flex items-center justify-center text-[20px] "
                onClick={showCalendar}
              >
                <TiDeleteOutline />
              </p>
            </div>
          )}

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
            className={`border-[#fca311] border-2 absolute top-[-20px] right-[32%] z-30  w-[161px] bg-[#353535] text-white rounded-[8px] h-[39px] content-center place-content-center place-items-center`}
          >
            {showFilter}
          </div>
          <div className=" top-[20px] right-[145px] z-30 flex items-center justify-center absolute">
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
                    className="grid grid-cols-[150px_170px_30px_30px] my-3 px-2 gap-5 text-center text-white bg-[#F9D87617] h-[57px] w-full items-center"
                    // className="flex my-1 place-content-evenly   columns- gap-8 select-none bg-[#F9D87617] h-[57px] w-full items-center justify-around text-white"
                  >
                    <div className="right flex items-center ">
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
                        {Number(res.amount).toLocaleString()}
                      </div>
                      <div className="text-[10px] date ">{res.date}</div>
                    </div>
                    <div
                      onClick={() => (
                        setIsOpen(true),
                        // setSelectedDateEdit(editInform.date),

                        setEditInform({
                          date: res.date,
                          description: res.description,
                          amount: res.amount,
                          id: res.id,
                          cate_choices: res.cate_choices,
                          type: res.type,
                        })
                      )}
                      className="text-[30px]  text-white cursor-pointer"
                      // className="block absolute my-4 left-[167px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <CiEdit></CiEdit>
                    </div>
                    <div
                      onClick={() => (
                        setIsOpenDelet(true),
                        // setSelectedDateEdit(editInform.date),

                        setDeletId(res.id)
                      )}
                      className="text-[25px] text-white cursor-pointer"
                      // className="block absolute my-4 left-[167px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <RiDeleteBin2Line></RiDeleteBin2Line>
                    </div>
                  </li>
                ))
              ) : (
                <div className="content-center place-content-center place-self-center h-full ">
                  <div className="text-white  text-[50px] flex items-center justify-center">
                    <MdOutlinePayments></MdOutlinePayments>
                  </div>
                  <p className="text-white my-4">ثبتی صورت نگرفته‌ است</p>

                  {isScrolled && (
                    <button
                      onClick={() => setIsScrolled(false)}
                      type="button"
                      className="focus:outline-none text-[8px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-1 py-2.5   dark:focus:ring-yellow-900"
                    >
                      ثبت هزینه
                    </button>
                  )}
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
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              key="editModal" // کلید بده تا درست کار کنه
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
                    ویرایش
                  </h2>

                  <button
                    onClick={() => (setIsOpen(false), setSelectedDateEdit(" "))}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-1"
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

                {/* Modal body */}
                <div className="content-center place-items-center  text-gray-600 dark:text-gray-300  space-y-6 text-sm leading-relaxed">
                  <div
                    dir="rtl"
                    className="w-[267px] flex justify-center items-center border-b-2 border-amber-500"
                  >
                    <input
                      value={editInform.description}
                      onChange={(e) =>
                        setEditInform({
                          ...editInform,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-blend- bg-transparent font-display border-transparent focus:outline-none ring-0  outline-none"
                    />{" "}
                  </div>

                  <div
                    dir="rtl"
                    className="w-[267px] flex justify-center items-center border-b-2 border-amber-500"
                  >
                    <input
                      value={editInform.amount}
                      onChange={(e) =>
                        setEditInform({ ...editInform, amount: e.target.value })
                      }
                      className="w-full bg-blend- bg-transparent font-display border-transparent focus:outline-none ring-0  outline-none"
                    />{" "}
                  </div>

                  {/* date and incpme&expense */}
                  <div className="flex justify-center">
                    <div className="me-4 flex items-center">
                      <label
                        htmlFor="yellow-radio "
                        className="mx-2 text-[9px]"
                      >
                        درآمد
                      </label>
                      <input
                        onClick={() => (
                          setcategory("parent"),
                          setflash(
                            <div className="text-white">
                              <HiArrowTrendingUp></HiArrowTrendingUp>
                            </div>
                          ),
                          setType("income"),
                          setEditInform({ ...editInform, type: "income" })
                        )}
                        name="default-radio"
                        type="radio"
                        id="yellow-radio"
                        className="text-[#fca311] size-[20px] focus:ring-[#fca311] rounded-[15px]"
                      />
                    </div>
                    <div className="me-4 flex items-center">
                      <label
                        htmlFor="yellow-radio "
                        className="mx-2 text-[9px]"
                      >
                        برآمد
                      </label>
                      <input
                        onClick={() => (
                          setcategory("needs"),
                          setflash(
                            <div className="text-[#fca311]">
                              <HiArrowTrendingDown></HiArrowTrendingDown>
                            </div>
                          ),
                          setType("expense"),
                          setEditInform({ ...editInform, type: "expense" })
                        )}
                        name="default-radio"
                        type="radio"
                        id="yellow-radio"
                        className="text-[#fca311] size-[20px] focus:ring-[#fca311] rounded-[15px]"
                      />
                    </div>
                  </div>

                  <div className=" flex items-center w-full justify-evenly">
                    <div
                      className="date border-2 text-[10px] w-[64px] bg-white h-[32px] text-center flex items-center justify-center border-[#fca311] rounded-[5px] cursor-pointer"
                      onClick={showCalendarEdit}
                    >
                      {/* {selectedDate && selectedDateEdit.format()} */}
                      {editInform?.date?.toString()}
                    </div>
                    {calendarEdit && (
                      <div className="absolute z-50">
                        <Calendar
                          value={selectedDateEdit}
                          onChange={(datenew: DateObject) => {
                            setSelectedDateEdit(datenew);
                            setEditInform({
                              ...editInform,
                              date: datenew.format("YYYY-MM-DD"),
                            });

                            setCalendarEdit(false);
                            // console.log("تاریخ انتخاب‌شده:", datenew&&datenew.format());
                          }}
                          calendar={persian}
                          locale={persian_fa}
                        />
                        <p
                          className=" absolute top-0  right-0 cursor-pointer text-red-600 rounded-full  flex items-center justify-center text-[20px] "
                          onClick={showCalendarEdit}
                        >
                          <TiDeleteOutline />
                        </p>
                      </div>
                    )}

                    {type == "income"}
                    <div className="border-2   border-[#fca311] ring-0 rounded-[5px]">
                      {type == "expense" ? (
                        <select
                          value={category}
                          className="ring-0 text-center content-center border-none text-[10px] h-[30px] outline-0 rounded-[5px] py-0"
                          onChange={(e) => {
                            handleChange(e);
                            setEditInform({
                              ...editInform,
                              cate_choices: e.target.value,
                            });
                          }}
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
                          onChange={(e) => {
                            handleChange(e);
                            setEditInform({
                              ...editInform,
                              cate_choices: e.target.value,
                            });
                          }}
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
                  {/* end */}
                  <button
                    onClick={() => (
                      updateCost(editInform.id), setSelectedDateEdit(" ")
                    )}
                    className="bg-[#fca311] text-white rounded-xl w-20"
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenDelet && (
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
                    حذف
                  </h2>

                  <button
                    onClick={() => setIsOpenDelet(false)}
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
                <p className="mb-10">آیا از حذف اطمینان دارید؟</p>
                {/* Modal body */}
                <div></div>
                <div
                  dir="rtl"
                  className=" dark:text-gray-300   flex items-center justify-evenly
                            leadig-relaxed"
                >
                  <button
                    className="bg-emerald-900 rounded-xl text-white w-[110px]"
                    onClick={() => (deleteCost(deletId), setIsOpenDelet(false))}
                  >
                    بله
                  </button>
                  <button
                    className="bg-red-700 rounded-xl text-rose-50 w-[110px]"
                    onClick={() => setIsOpenDelet(false)}
                  >
                    خیر
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
