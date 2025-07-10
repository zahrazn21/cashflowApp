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
    <>
      <div className="h-full  ">
        <div className="w-[450px] relative  h-[50%] bg-amber-600">
          <div className="z-30 w-[120px] h-[120px] absolute top-30 right-62 border-4 bg-cover bg-[url(assets/image/596.jpg)] m-4 rounded-full"></div>
          <div className=" mask-clip-border w-[140px] h-[140px] absolute top-24 border-4 z-40 right-40 bg-cover bg-[url(assets/image/parents.jpg)] rounded-full bg-bottom"></div>
          <div className="z-30 w-[120px] h-[120px] absolute top-30 left-62  border-4 bg-cover m-4 rounded-full bg-[url(assets/image/children.jpg)]"></div>
        </div>
        <div className="absolute  top-40 text-center place-items-center  h-[280px] rounded-t-[50%] overflow-hidden w-[450px] bg-[oklch(0.96_0_0)]">
          <div className="logo w-[270px] mt-30">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="relative z-30 my-10">
          <p className="text-[#fca311] mb-20 text-[20px] font-bold"> ورود</p>
          {/* <div className="grid content-center place-items-center w-[144px] h-[89px] bg-[#353535]  rounded-[15px]"> */}
          <div className="flex w-full  justify-evenly items-center  content-center place-items-center  h-[89px]  rounded-[15px]">
            <Link to={"/LoginParent"}>
              <div className="place-items-center">
                <div className="w-[150px] h-[150px] border-2 border-black bg-top bg-cover  bg-[url(assets/image/parentslogin.jpg)]  rounded-full"></div>
                <div
                  //   onClick={loginUseHandel}
                  className="w-[116px] my-1 bg-[#fca311] content-center text-white place-items-center  h-[40px] rounded-[18px] "
                >
            ورود والدین
                </div>
              </div>
            </Link>

            <Link to={"/LoginChild"}>
              <div className="place-items-center">
                <div className="w-[150px] h-[150px] bg-cover border-2 border-black bg-[url(assets/image/teenagers.jpg)] bg-top  rounded-full"></div>

                <div
                  //   onClick={loginUseHandel}
                  className="w-[116px] my-1 bg-[#fca311] content-center text-white place-items-center  h-[40px] rounded-[18px] "
                >
                  ورود نوجوان
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
