import { AnimatePresence, motion } from "framer-motion";
import "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { useAppContext } from "./AppContext";

interface showHeaderPathsType {
  link: string;
  name: string;
}
interface type {
  showHeaderPaths: showHeaderPathsType[];
}
export default function Header({ showHeaderPaths }: type) {
  const param = useParams();
  console.log("paran", param);

  const [textMenu, setTextMenu] = useState(" داشبورد");
  const [menuClick, setClickmenu] = useState(false);
  const handelclickMenu = () => {
    if (!menuClick) {
      setClickmenu(true);
    } else {
      setClickmenu(false);
    }
  };
  const handeSetText = (text: string) => {
    setTextMenu(text);
    setClickmenu(false);
  };
  const { userName } = useAppContext();
  return (
    <>
      <div className="w-[450px] overflow-x-clip h-[49px] top-0 fixed z-50  py-2 bg-white flex items-center justify-between text-center font-bold text-lg">
        <div className="flex items-center justify-evenly">
          <p className="text-[30px] bg-black text-white rounded-full mx-2">
            <IoPersonCircle />
          </p>
  
          <p 
          
          className="text-[#fca311] text-stroke:1px_black  [text-shadow:1px_1px_0_black,_-1px_-1px_0_black,_1px_-1px_0_black,_-1px_1px_0_black]">{userName}</p>
        </div>

        <div
          dir="rtl"
          className={`flex items-center mx-2 relative 
          }`}
        >
          <p className="text-[30px] " onClick={handelclickMenu}>
            <MdMenu />
          </p>
          <p className="text-[12px]">{textMenu}</p>
        </div>

        <AnimatePresence>
          {menuClick && (
            // <ul className="w-[160px] h-fit gap-2 grid py-4 text-[15px] absolute bg-[#353535] mx-1 border-2 border-[#fca311] rounded-[30px]  right-0 top-10 ">

            <motion.aside
              key="sidebar"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0  right-0 w-64 bg-white dark:bg-gray-800 shadow-xl p-4 z-50"
            >
              <ul className="w-[260px]   h-screen py-11   text-[15px] absolute bg-[#353535]    right-0 top-0">
                <div
                  className="text-white cursor-pointer z-50 text-[25px] fixed top-3 mx-5"
                  onClick={handelclickMenu}
                >
                  <RxCross1 />
                </div>
                {showHeaderPaths.map((res) => (
                  <Link
                    to={res.link}
                    onClick={() => {
                      handeSetText(res.name);
                    }}
                  >
                    <li className="bg-[#46433b] border-2 hover:bg-[#797878] border-[#fca311] rounded-[4px] my-3 py-4 text-white">
                      {res.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {menuClick && (
        <div className="bg-black opacity-70 z-40 absolute w-full  h-full top-0 "></div>
      )}
    </>
  );
}
