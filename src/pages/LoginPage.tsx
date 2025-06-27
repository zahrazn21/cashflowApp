import "react";
import logo from "../../src/assets/image/logo.png";

import { Link } from "react-router-dom";

// const data = [
//   { title: "ایمیل", icon: "", type: "text" },
//   { title: "رمز عبور", icon: "", type: "password" },
// ];
export default function LoginPage() {
//   const loginUseHandel = async () => {
//     try {
//       await axios.post("");
//     } catch (err) {
//       console.log(err);
//     }
//   };
  return (
    <div className=" text-center place-items-center  h-full">
      <div className="logo w-[270px] mt-20">
        <img src={logo} alt="" />
      </div>
      <div className="h-[60%]  grid   place-items-center">
        <p className="text-[#fca311] text-[20px] font-bold"> ورود</p>
        <div className="grid content-center place-items-center w-[144px] h-[89px] bg-[#353535]  rounded-[15px]">
          <Link to={"/LoginParent"} >
            <div
            //   onClick={loginUseHandel}
              className="w-[116px] content-center text-white place-items-center  h-[40px] rounded-[18px] "
            >
             ورود والد
            </div>
          </Link>

          <Link to={"/LoginChild"}>
            <div
            //   onClick={loginUseHandel}
            className="w-[116px] content-center text-white place-items-center  h-[40px] rounded-[18px] "
            >
              ورود فرزند
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
