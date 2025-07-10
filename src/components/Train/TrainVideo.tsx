import "react";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

interface Type {
  title?: string;
  href?: string;
}
export default function Video({ title, href }: Type) {
  
  return (
    <a href={href}>
      <div className="item4 w-[90px]   h-[30px] rounded-[46px] bg-[#353535] relative border-[3px] border-[#353535]">
        <div className="video flex items-center justify-end mx-1 h-[100%]">
          <p className="text-[#fca311] text-[10px]">{title}</p>
        </div>
        <span className="material-symbols-outlined absolute text-white left-[-8px] top-[-7px] text-[40px]">
          <MdOutlineSlowMotionVideo></MdOutlineSlowMotionVideo>
        </span>
      </div>
    </a>
  );
}
