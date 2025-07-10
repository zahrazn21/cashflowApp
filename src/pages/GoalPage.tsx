import "react";
import InputCost from "../components/Cost registration/InputCost";
import { useEffect, useRef, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrTarget } from "react-icons/gr";

import api from "../service/api";
import { AnimatePresence, motion } from "framer-motion";
// import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import ProgressBar from "../components/DashboardCild/ProgressBar";
// import axios from "axios";
export interface costType {
  id: number;
  goal: string;
  goal_amount: number;
  savings: number;
}

interface dataFilterType {
  title: "all" | "day" | "week" | "month";
  pertionTitle: string;
}
export default function GoalPage() {
  const dataFilter: dataFilterType[] = [
    { title: "all", pertionTitle: "همه" },
    { title: "day", pertionTitle: "امروز" },
    { title: "week", pertionTitle: "این هفته" },
    { title: "month", pertionTitle: "این ماه" },
  ];
  const data = [
    { title: "هدف", type: "text" },
    { title: "مقدار هزینه", type: "text" },
    { title: "مقدار فعلی", type: "text" },
  ];

  const [idn, setId] = useState<number | undefined>(undefined);

  const titleRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLInputElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const childToken = localStorage.getItem("child_token_");

  const fetchData = async () => {
    try {
      const res = await api.get("goals/", {
        headers: {
          Authorization: `Token ${childToken}`,
        },
      });
      setDataGoal(res.data);
      console.log("shod", res.data);
    } catch (err) {
      console.error("خطا در گرفتن داده‌ها:", err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const EditData = async (id: number | undefined) => {
    console.log("id in function", id);

    const cost = costRef.current?.value || 0;
    const current = currentRef.current?.value || 0;
    console.log("current&cost", cost, current);

    try {
      const res = await api.patch(
        `goals/${id}/`,
        { goal_amount: Number(cost), savings: Number(current) }, // فقط چیزی که می‌خوای ویرایش کنی

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${childToken}`,
          },
        }
      );
      console.log("OK", res.data);
      fetchData();
    } catch (err) {
      console.log(err);
    }

    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (costRef.current) {
      costRef.current.value = "";
    }
    if (currentRef.current) {
      currentRef.current.value = "";
    }
  };

  const DeletData = async (id: number | undefined) => {
    const cost = costRef.current?.value || 0;
    const current = currentRef.current?.value || 0;
    console.log("current&cost", cost, current);

    try {
      const res = await api.delete(`goals/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
      console.log("OK", res.data);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  const costs = async () => {
    const title = titleRef.current?.value || "";
    const cost = costRef.current?.value || 0;
    const current = currentRef.current?.value || 0;
    const data = {
      // id:35,
      goal_amount: Number(cost),
      goal: title,
      savings: Number(current),
      // child: 4,
    };
    console.log("goal post a", data);

    if (title && cost && current) {
      try {
        const res = await api.post("goals/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${childToken}`,
          },
        });
        console.log("goal post", res);
        fetchData();
      } catch (err) {
        console.log("goal err", err);
      }
    }

    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (costRef.current) {
      costRef.current.value = "";
    }
    if (currentRef.current) {
      currentRef.current.value = "";
    }
  };

  const [dataGoal, setDataGoal] = useState<costType[] | null>(null);

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
      setIsScrolled(true);
    } else if (endY - startY > 50) {
      setIsScrolled(false);
    }

    setStartY(null);
  };

  const [showFilter, setShowFilter] = useState("همه");
  const selectFilterHandel = (res: dataFilterType) => {
    setShowFilter(res.pertionTitle);
    // setFilter(res.title);
    setClickFilterMenu(false);
  };

  const [editClick, setEditClick] = useState(false);
  const showEdit = (
    current: number,
    amount: number,
    goal: string,
    id: number
  ) => {
    console.log(goal, amount, current);

    setId(id);

    if (titleRef.current?.value == "" || titleRef.current) {
      titleRef.current.value = goal;
    }
    if (costRef.current?.value == "" || costRef.current) {
      costRef.current.value = amount.toString();
    }
    if (currentRef.current?.value == "" || currentRef.current) {
      currentRef.current.value = current.toString();
    }
    if (!editClick) {
      setEditClick(true);
    }
    // }else{
    // setGoalEdit("");
    // setamountlEdit(0);
    // setcurrentEdit(0);}
  };

  const DeletFunc = (id: number | undefined) => {
    DeletData(id);
  };
  const registering = () => {
    setEditClick(false);

    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (costRef.current) {
      costRef.current.value = "";
    }
    if (currentRef.current) {
      currentRef.current.value = "";
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [idGoal, setIdGoal] = useState(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <div
      className="w-full h-full scroll-auto overflow-visible"
      onMouseUp={handleMouseUp}
    >
      <div className="grid bg-[oklch(0.96_0_0)] gap-8 h-[400px] place-content-center">
        <div className="grid gap-5 w-fit">
          <InputCost
            ref={titleRef}
            res={data[0]}
            // value={goalEdit && goalEdit}
          ></InputCost>
          <InputCost
            ref={costRef}
            res={data[1]}
            // value={amountEdit && amountEdit}
          ></InputCost>
          <InputCost
            ref={currentRef}
            res={data[2]}
            // value={currentEdit && currentEdit}
          ></InputCost>
        </div>

        <div className="flex items-center justify-center ">
          {!editClick && (
            <button
              onClick={costs}
              type="button"
              className="focus:outline-none  bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-5 py-2.5   dark:focus:ring-yellow-900"
            >
              ثبت
            </button>
          )}

          {editClick && (
            <div>
              <button
                onClick={() => EditData(idn)}
                type="button"
                className="focus:outline-none  bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-5 py-2.5   dark:focus:ring-yellow-900"
              >
                ویرایش
              </button>
              <p
                className="text-[14px] cursor-pointer text-red-600 my-2"
                onClick={() => registering()}
              >
                ثبت هدف
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`" w-[450px] top-20 bg-[#353535]  h-full ${
          isScrolled &&
          "fixed top-15 transition delay-150 duration-300 ease-in-out"
        }  `}
      >
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
            <ul className="h-full">
              {dataGoal && dataGoal.length > 0 ? (
                dataGoal.map((res, index) => (
                  <div
                    dir="rtl"
                    className="flex px-2  my-7 select-none bg-[#F9D87617]  w-full items-center justify-around text-white"
                  >
                    <p
                      className="text-white text-[20px]"
                      onClick={() => (setIsOpen(true), setIdGoal(res.id))}

                      // onClick={() => DeletFunc(res.id)}
                    >
                      <FaDeleteLeft></FaDeleteLeft>
                    </p>
                    <li>
                      <ProgressBar
                        key={index}
                        current={res.savings}
                        total={res.goal_amount}
                        name={res.goal}
                      ></ProgressBar>
                    </li>
                    <p
                      className="text-[#fca311] text-[20px]"
                      onClick={() =>
                        showEdit(res.savings, res.goal_amount, res.goal, res.id)
                      }
                    >
                      <MdOutlineEdit></MdOutlineEdit>
                    </p>
                  </div>
                ))
              ) : (
                <div className="content-center place-content-center place-self-center h-full ">
                  <div className="text-white  text-[50px] flex items-center justify-center">
                    <GrTarget></GrTarget>
                  </div>
                  <p className="text-white my-4"> هدفی وجود ندارد </p>

                  {isScrolled && (
                    <button
                      onClick={() => setIsScrolled(false)}
                      type="button"
                      className="focus:outline-none text-[8px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[18px] w-[100px] h-[35px] text-sm px-1 py-2.5   dark:focus:ring-yellow-900"
                    >
                      ثبت هدف
                    </button>
                  )}
                </div>
              )}
            </ul>
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
                          حذف
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
                          onClick={() => (DeletFunc(idGoal), setIsOpen(false))}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
