import "react";
import { useState } from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}

interface DetailBoxProps {
  detailRequest: costType[] | null;
  name: string;
  // onClick: () => void;
  // isOpen:boolean
  Percentage: number;
}

export default function DetailBox({
  detailRequest,
  name,
  Percentage,
}: DetailBoxProps) {
  const [click, setClick] = useState(false);
  const handelClick = () => {
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  return (
    <div className="my-10">
      <div
        onClick={handelClick}
        className={`${
          !click
            ? "border-[#fca311] flex items-center justify-center rounded-[30px] h-[84px] text-white border-2 bg-[#353535] w-[337px]"
            : "w-[132px] h-[37px] content-center rounded-t-[30px] border-2 border-white  relative left-[205px] z-20  bg-[#353535] text-white "
        } cursor-pointer`}
      >
        <div
          dir={`${click && "rtl"}`}
          className={`${
            click ? "flex items-center justify-around" : "grid gap-2"
          } `}
        >
          <p
            className={`${
              click ? "text-[15px]" : "text-[20px]"
            } text-[#fca311]`}
          >
            {name}
          </p>
          {!click && <p className="text-white text-[10px]">{Percentage}%</p>}{" "}
        </div>
      </div>
      <AnimatePresence>
        {click && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {
              <ul className="border-2 border-white overflow-auto py-2 [&::-webkit-scrollbar]:w-0 w-[337px] h-[271px] rounded-b-[30px] rounded-tl-[30px] bg-[#353535]">
                {detailRequest?.map((res, index) => (
                  <li
                    dir="rtl"
                    className=" grid grid-cols-3 select-none text-white px-2 text-[12px]  items-center justify-between h-[27px] bg-[#F9D87617] my-3"
                    key={index}
                  >
                    <div className="flex items-center">
                      {res.type === "income" ? (
                        <span className="icon">
                          {" "}
                          <HiArrowTrendingUp></HiArrowTrendingUp>
                        </span>
                      ) : (
                        <span className="icon">
                          <div className="text-[#fca311]">
                            <HiArrowTrendingDown></HiArrowTrendingDown>
                          </div>
                        </span>
                      )}
                      <p className="mr-1">{res.description}</p>
                    </div>

                    <p>
                {
                  Number(res.amount)<1000000?
                  `${(Number(res.amount)/1000).toLocaleString()} هزار تومن`:
                  `${(Number(res.amount)/100000).toLocaleString()}میلیون تومن`
                  
                }

                    </p>
                    <p>{res.date}</p>
                  </li>
                ))}
              </ul>
            }{" "}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
