import "react";
// import { useRef } from "react";
// import Input from "../../ui/Input";
import ChildSignUp from "../../../pages/ChildSignUp";

export default function AddUser() {
  // const data = [
  //   { title: "مقدار هزینه", type: "text", icon:"" },
  //   { title: "مقدار فعلی", type: "text" , icon:"" },
  // ];
  // const passRef = useRef<HTMLInputElement>(null);

  // const useNameRef = useRef<HTMLInputElement>(null);
  return (
    <div className="h-[558px] border-2 border-[#353535] rounded-[46px] w-[380px] bg-white">
      {/* <div className="grid gap-7">
        <div className="grid gap-4">
          <Input res={data[0]} ref={useNameRef}></Input>
          <Input res={data[1]} ref={passRef}></Input>

        </div>
        <div>
          <button className="bg-[#fca311] h-[35px] w-[100px] rounded-[18px]">
            ورود
          </button>
        </div>
        <div></div>
      </div> */}
      <ChildSignUp></ChildSignUp>
    </div>
  );
}
