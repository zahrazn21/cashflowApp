import "react";
import { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

interface showHeaderPathsType{
    link:string
    name:string
}
interface type{
    showHeaderPaths:showHeaderPathsType[]
}
export default function Header({showHeaderPaths}:type) {
    const param=useParams()
    console.log("paran",param);
    
    const [textMenu,setTextMenu]=useState(" داشبورد")
    const [menuClick,setClickmenu]=useState(false)
    const handelclickMenu=()=>{
        if(!menuClick){
            setClickmenu(true)
        }else{
            setClickmenu(false)
        }

    }
    const handeSetText=(text:string)=>{
        setTextMenu(text)
        setClickmenu(false)

    }
    console.log("showHeaderPaths",showHeaderPaths);
    
  return (
    
      <div className="w-[450px] h-[49px] top-0 fixed z-50  py-2 bg-white flex items-center justify-between text-center font-bold text-lg">
        <p className="text-[30px] text-[#fca311] bg-black rounded-full mx-2">
          <IoPersonCircle />
        </p>
        <div dir="rtl" className="flex items-center mx-2 relative">
          <p className="text-[30px] " onClick={handelclickMenu}>
            <MdMenu />
          </p>
          <p className="text-[12px]">{textMenu}</p>
        </div>
        {menuClick&&
        <ul className="w-[160px] h-fit gap-2 grid py-4 text-[15px] absolute bg-[#353535] mx-1 border-2 border-[#fca311] rounded-[30px]  right-0 top-10 ">
            {showHeaderPaths.map((res)=>(
                <Link to={res.link} onClick={()=>{handeSetText(res.name)}}>
                    <li className="bg-[#46433b] my-1 text-white">{res.name}</li>
                </Link>
            ))}
        </ul>
        }
      </div>
  );
}
