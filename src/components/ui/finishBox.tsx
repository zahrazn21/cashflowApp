import "react";
import { motion } from "framer-motion";

import { FaRegCheckCircle } from "react-icons/fa";
interface type {
  title: string;
}
export default function FinishBox({ title }: type) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-evenly rounded-[31px] py-2 px-1 w-[260px] h-[74px] relative top-0 text-[#fca311] bg-[#353535] ">
        <p className="text-[#fca311] text-[30px] mx-2">
          <FaRegCheckCircle />
        </p>
        <p>{title}</p>
      </div>
    </motion.div>
  );
}
