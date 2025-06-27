import "react";
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
  detailRequest: costType[] | null|undefined;
  // onClick: () => void;
  // isOpen:boolean
}

export default function RecentTransaction({
  detailRequest,
}: DetailBoxProps) {


  return (
    <div className="my-2">
    
      <AnimatePresence>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {
              <ul className=" border-2 border-white overflow-auto py-2 [&::-webkit-scrollbar]:w-0 w-[400px] h-[271px] rounded-b-[30px] rounded-tl-[30px] bg-[#353535]">
                {detailRequest?.map((res, index) => (
                  <li
                    dir="rtl"
                    className="grid grid-cols-4 select-none text-white px-2 text-[12px]  items-center justify-between h-[27px] bg-[#F9D87617] my-3"
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

                    <p>تومان{res.amount}</p>
                    <p>{res.cate_choices==="needs"? "نیازها": res.cate_choices==="wants"?"خواسته ها":"سایر"}</p>


                    <p>{res.date}</p>
                  </li>
                ))}
              </ul>
            }{" "}
          </motion.div>
    
      </AnimatePresence>
    </div>
  );
}
