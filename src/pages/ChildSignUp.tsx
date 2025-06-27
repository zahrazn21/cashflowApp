import "react";
import logo from "../../src/assets/image/logo.png";
// import { FormEvent, useEffect, useRef, useState } from "react";
import {  useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// import api from "../../service/api";
import axios from "axios";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import FinishBox from "../components/ui/finishBox";

axios.defaults.withCredentials = true;

const data = [
  {
    key: "name",
    title: "نام کاربری",
    icon: <MdOutlinePersonOutline></MdOutlinePersonOutline>,
    type: "text",
  },
  {
    key: "email",
    title: " ایمیل",
    icon: <MdOutlineMail></MdOutlineMail>,
    type: "text",
  },
  {
    key: "password",
    title: "رمز عبور",
    icon: <MdLockOutline></MdLockOutline>,
    type: "password",
  },
  {
    key: "confirmPassword",
    title: "کد ارسال شده به ایمیل",
    icon: <MdLockOutline></MdLockOutline>,
    type: "password",
  },
];
export default function ChildSignUp() {


  const navigate = useNavigate();

  // const usernameRef=useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const codeRef = useRef<HTMLInputElement>(null);

  const [errorEmail, setErrorEmail] = useState({
    email: "",
  });
  const [errorEmailAndCode, setErrorEmailAndCode] = useState({
    email: "",
    code: "",
  });

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  console.log("/inputRefs", inputRefs.current);

  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState<string>("");

  const testSignUpWithEmail = async () => {
    const email = { email: emailRef.current?.value || "" };

    const newErrors: { email: string } = { email: "" };

    if (!email.email) {
      newErrors.email = "ایمیل نباید خالی باشد";
    }

    const hasErrors = Object.values(newErrors).some((value) => value !== "");

    if (hasErrors) {
      setErrorEmail(newErrors);
      return; // اگه خطا هست، ادامه نده
    } else {
      setErrorEmail({ email: "" }); // خطاها رو پاک کن اگه هیچ مشکلی نبود
    }
    console.log(email);

    try {
      await axios.post(
        "http://localhost:8000/cashflow/api/child/signup/email/",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Signup email response =>", res.data);

      // ذخیره ایمیل برای مراحل بعد
      setSavedEmail(email.email);

      // رفتن به مرحله بعد بعد از موفقیت
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const codeRijestion = async () => {
    const code = { code: codeRef.current?.value };
    const data3 = { email: savedEmail, code: code.code };
    console.log("dataaaaaaaaaaaaa", data);

    const newErrors: {
      email: string;
      code: string;
    } = {
      email: "",
      code: "",
    };

    for (const [key, value] of Object.entries(data3)) {
      if (!value) {
        switch (key) {
          case "email":
            newErrors[key as keyof typeof newErrors] = `ایمیل نباید خالی باشذ`;
            break;
          case "code":
            newErrors[
              key as keyof typeof newErrors
            ] = `کد ارسال شده به ایمیل نباید خالی باشد`;
            break;

          default:
            newErrors[key as keyof typeof newErrors] = `${key} نباید خالی باشد`;

            break;
        }
      }
    }
    if (Object.values(newErrors).length > 0) {
      setErrorEmailAndCode(newErrors);
    } else {
      // setError()
    }
    const hasErrors = Object.values(newErrors).some((value) => value !== "");

    try {
      if (!hasErrors) {
        const res2 = await axios
          .post(
            "http://localhost:8000/cashflow/api/child/signup/verify-code/",
            data3,
            { withCredentials: true }
          )
          .then((res) => {
            console.log("res4 =>", res);
            setStep(3);
            console.log(res2);
          });
        // .catch(error=>{
        //        console.log(error);

        // })
      }
    } catch (error) {
      console.error("Error in signup:", error);
    }
  };

  const [finish, setFinosh] = useState(false);
  const confirmHandel = async () => {
    const parentToken = localStorage.getItem("parent_token");
    const data2 = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    console.log("ddd", data2);
    console.log("parentToken", parentToken);

    try {
      const res = await axios.post(
        "http://localhost:8000/cashflow/api/child/signup/confirm/",
        data2,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${parentToken}`,
          },
        }
      );
      console.log("username and password", res.data);

      setFinosh(true);
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <div  className=" text-center place-items-center  h-full ">
      <div className="logo w-[270px] mt-20">
        <img src={logo} alt="" />
      </div>
      <div className="h-[60%]  grid gap-4  place-items-center">
        <p className="text-[#fca311] text-[15px] font-bold">ثبت نام فرزند</p>
        {/* {data.map((res,index) => (
          <>
                      <Input key={index} res={res} ref={(el) => { inputRefs.current[res.key] = el }}></Input>        
                      <div className="error" ></div>
          </>
        ))} */}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {step == 1 && (
              <Input
                res={data[1]}
                ref={emailRef}
                err={errorEmail.email}
              ></Input>
            )}
            {step === 2 && (
              <>
                <Input
                  res={data[3]}
                  ref={codeRef}
                  err={errorEmailAndCode.code}
                ></Input>
              </>
            )}
            {step === 3 && (
              <>
                <div className="grid gap-15">
                  <Input res={data[0]} ref={usernameRef} err={""}></Input>
                  <Input res={data[2]} ref={passwordRef} err={""}></Input>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        {step == 1 && (
          <button
            onClick={testSignUpWithEmail}
            className="w-[116px]  h-[40px] rounded-[18px] bg-[#fca311]"
          >
            مرحله بعد
          </button>
        )}
        {step == 2 && (
          <button
            onClick={codeRijestion}
            className="w-[116px]  h-[40px] rounded-[18px] bg-[#fca311]"
          >
            مرحله بعد
          </button>
        )}
        {step == 3 && (
          <button
            onClick={confirmHandel}
            className="w-[116px]  h-[40px] rounded-[18px] bg-[#fca311]"
          >
            ثبت نام
          </button>
        )}
      </div>
      {finish && <FinishBox title="ثبت نام با موفقیت انجام شد"></FinishBox>}
    </div>
  );
}
