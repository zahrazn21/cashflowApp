import "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Child, useChild } from "../ParentDashboard/AddUsers/ChildProvider";

interface showHeaderPathsType {
  link: string;
  name: string;
}
interface type {
  showHeaderPaths: showHeaderPathsType[];
}
export default function ParentHeader({ showHeaderPaths }: type) {
  const param = useParams();
  console.log("param:", param);
  const { setSelectedChild, childName, selectedChild,stepChild } = useChild();

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
  console.log("showHeaderPaths", showHeaderPaths);

  const [select, setSelect] = useState(false);

  const selectChild = () => {
   
    if (!select) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  };
  const handelSelected = (res: Child) => {
    setSelectedChild(res);
    setSelect(false);
  };
  return (
    <div className="w-[450px] h-[49px] top-0 fixed z-50  py-2 bg-white flex items-center justify-between text-center font-bold text-lg">
      <div className="flex items-center">
        <p
          className="text-[30px] text-[#fca311] bg-black rounded-full mx-2"
          onClick={selectChild}
        >
          <IoPersonCircle />
        </p>
        <p className="text-[#fca311]">{selectedChild?.username}</p>
      </div>

      <div dir="rtl" className="flex items-center mx-2 relative">
        <p className="text-[30px] " onClick={handelclickMenu}>
          <MdMenu />
        </p>
        <p className="text-[12px]">{textMenu}</p>
      </div>
      {menuClick && (
        <ul className="w-[160px] h-fit gap-2 grid py-4 text-[15px] absolute bg-[#353535] mx-1 border-2 border-[#fca311] rounded-[30px]  right-0 top-10 ">
          {showHeaderPaths.map((res) => (
            <Link
              to={res.link}
              onClick={() => {
                handeSetText(res.name);
              }}
            >
              <li className="bg-[#46433b] my-1 text-white">{res.name}</li>
            </Link>
          ))}
        </ul>
      )}

      {/* <div className="bg-[#fca311] py-5 w-[450px] h-[90px] place-content-center place-items-center px-2 fixed  bottom-0"> */}
      {/* <div className="cursor-pointer select-none" onClick={selectChild}>
                انتخاب فرزند
              </div> */}
      {select &&stepChild==1&& (
        <ul className="w-[160px] h-fit gap-2 grid py-4 text-[15px] absolute bg-[#353535] mx-1 border-2 border-[#fca311] rounded-[30px] top-[45px]">
          {childName?.map((res) => (
            <li
              className="bg-[#46433b] my-1 text-white cursor-pointer"
              onClick={() => handelSelected(res)}
            >
              {res.username}
            </li>
          ))}
        </ul>
      )}
    </div>
    //   </div>
  );
}
