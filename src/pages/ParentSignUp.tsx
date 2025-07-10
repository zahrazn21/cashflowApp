import "react";
import logo from "../../src/assets/image/logo.png";
import Input from "../components/ui/Input";
// import { FormEvent, useEffect, useRef, useState } from "react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegQuestionCircle } from "react-icons/fa";

// import api from "../../service/api";
import axios from "axios";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
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
export default function SignUp() {
  // const usernameRef=useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const codeRef = useRef<HTMLInputElement>(null);

  // const [error,setError]=useState({
  //   "name":"",
  //   "password":"",
  //   "email":"",
  //   "confirmPassword":"",

  // })

  // const handleSubmit = (e:FormEvent) => {
  //   e.preventDefault()
  //     const values: { [key: string]: string } = {};
  //     data.forEach(({ key }) => {
  //       const ref = inputRefs.current[key];
  //       if (ref) values[key] = ref.value;

  //         if(!values[key]){
  //           setError(prev=>({
  //             ...prev,
  //             [key]:`${key} is error`

  //           })

  //           )

  //         }

  //         if(Object.values(error).length>0){
  //           setError(error)
  //         }else{

  //           console.log("l");

  //         }
  //     });
  // const [error,setError]=useState({
  //   "name":"",
  //   "password":"",
  //   "email":"",
  //   "code":"",
  // })
  const [errorEmail, setErrorEmail] = useState({
    email: "",
  });
  const [errorEmailAndCode, setErrorEmailAndCode] = useState({
    email: "",
    code: "",
  });

  //  const handleError=(data:{ email: string; name: string; password: string , code:string })=>{

  //   // const newErrors: { [key: string]: string  } = {};
  //   const newErrors: {
  //     name: string;
  //     password: string;
  //     email: string;
  //     code: string;
  //   } = {
  //     name: "",
  //     password: "",
  //     email: "",
  //     code: "",
  //   };

  //   for(const [key,value] of Object.entries(data)){
  //     if(!value){
  //       switch (key) {
  //         case "name":
  //           newErrors[key as keyof typeof newErrors]=`نام کاربری نباید خالی باشذ`

  //           break;
  //         case "email":
  //           newErrors[key as keyof typeof newErrors]=`ایمیل نباید خالی باشذ`
  //           break;
  //           case "password":
  //           newErrors[key as keyof typeof newErrors]=`رمز عبور نباید خالی باشد`
  //           break;
  //           case "confirmPassword":
  //           newErrors[key as keyof typeof newErrors]=`تکرار رمز عبور نباید خالی باشد`
  //           break;

  //         default:newErrors[key as keyof typeof newErrors]=`${key} is not found`

  //           break;
  //       }
  //     }
  //   }
  //   if(Object.values(newErrors).length>0){
  //     setError(newErrors)
  //   }else{
  //     // setError()
  //   }
  //   const hasErrors = Object.values(newErrors).some(value => value !== "");

  //   return hasErrors
  //  }

  // const handleSubmit = (e:FormEvent) => {
  //   e.preventDefault()

  //   const datas={
  //     "name":usernameRef.current?.value,
  //     "password":passwordRef.current?.value,
  //     "email":emailRef.current?.value,
  //     "confirmPassword":codeRef.current?.value,

  //   }

  //   // const newErrors: { [key: string]: string  } = {};
  //   const newErrors: {
  //     name: string;
  //     password: string;
  //     email: string;
  //     code: string;
  //   } = {
  //     name: "",
  //     password: "",
  //     email: "",
  //     code: "",
  //   };

  //   for(const [key,value] of Object.entries(datas)){
  //     if(!value){
  //       switch (key) {
  //         case "name":
  //           newErrors[key as keyof typeof newErrors]=`نام کاربری نباید خالی باشذ`

  //           break;
  //         case "email":
  //           newErrors[key as keyof typeof newErrors]=`ایمیل نباید خالی باشذ`
  //           break;
  //           case "password":
  //           newErrors[key as keyof typeof newErrors]=`رمز عبور نباید خالی باشد`
  //           break;
  //           case "confirmPassword":
  //           newErrors[key as keyof typeof newErrors]=`تکرار رمز عبور نباید خالی باشد`
  //           break;

  //         default:newErrors[key as keyof typeof newErrors]=`${key} is not found`

  //           break;
  //       }
  //     }
  //   }
  //   if(Object.values(newErrors).length>0){
  //     setError(newErrors)
  //   }else{
  //     // setError()
  //   }
  //   const hasErrors = Object.values(newErrors).some(value => value !== "");

  //   if(datas.password && datas.password.length<8){
  //     setError(prev=>({
  //         ...prev,
  //         ["password"]:"password is not 8 char"
  //      }))
  //    }
  //    if(datas.name && datas.name.length<12){
  //     setError(prev=>({
  //         ...prev,
  //         ["name"]:"name is not 12 char"
  //      }))
  //    }

  //     if(!hasErrors){
  //         axios.post('http://localhost:8000/cashflow/api/parent/login', datas)
  //           .then(function (response) {
  //             console.log(response);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });

  //         }
  //       }

  // useEffect(()=>{
  //     axios.get("http://localhost:8000/cashflow/api/parent/login").then((res)=>{
  //         console.log(JSON.stringify(res.data));

  //     })
  // },[])

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  console.log("/inputRefs", inputRefs.current);

  // console.log("errorrrr",error);

  // Amir Jokar => test sign up API
  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState<string>("");

  // const testSignUpWithEmail =async ()=>{
  //   const email = {email : emailRef.current?.value||''}
  //   // const code = {code : codeRef.current?.value}
  //   // const data={email:savedEmail,code:code.code}
  //   // console.log("dataaaaaaaaaaaaa",data);

  //   const newErrors: {
  //     email: string;
  //   } = {
  //     email: "",
  //   };

  //   for(const [key,value] of Object.entries(email)){
  //     if(!value){
  //     newErrors[key as keyof typeof newErrors]=`ایمیل نباید خالی باشد`

  //     }
  //   }
  //   if(Object.values(newErrors).length>0){
  //     setErrorEmail(newErrors)
  //   }else{
  //     // setError()
  //   }
  //   const hasErrors = Object.values(newErrors).some(value => value !== "");

  // if(!hasErrors){
  //   setStep(2)

  //   try{

  //     const res1=await axios.post("http://localhost:8000/cashflow/api/parent/signup/email/" , email ).then((res)=>{
  //       console.log("res =>" , res);
  //       setSavedEmail(email.email)

  //     })
  //     console.log(res1);

  //   }catch (error) {
  //   console.error("Error in signup:", error);

  // }
  // }

  // }

  // const [hasErrors,setHasError]=useState(false)
  const testSignUpWithEmail = async () => {
    const email = { email: emailRef.current?.value || "" };
    setErrorEmail({ email: "" });
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

    if (!hasErrors) {
      try {
        const res = await axios.post(
          "http://localhost:8000/cashflow/api/parent/signup/email/",
          email,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setStep(2);

        console.log("Signup email response =>", res);

        // ذخیره ایمیل برای مراحل بعد
        setSavedEmail(email.email);

        // رفتن به مرحله بعد بعد از موفقیت
      } catch (err) {
        console.log(err);
      }

      // if (error.response) {
      //   // سرور یه پاسخ داده با یه status code که غیر از 2xx هست
      //   console.error("Server responded with error:", error.response.data);

      //   // مثلا error.response.data.message یا هر چیزی که سرور فرستاده
      //   if (error.response.data) {
      //     console.log("خطا از سمت سرور:", error.response.data);
      //   }
      // } else if (error.request) {
      //   // درخواست فرستاده شده ولی پاسخی نیومده
      //   console.error("No response received:", error.request);
      // } else {
      //   // خطای دیگه مثل اشتباه تایپی یا تنظیمات
      //   console.error("Error in setting up the request:", error.message);
      // }      }
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
        const res2 = await axios.post(
          "http://localhost:8000/cashflow/api/parent/signup/verify-code/",
          data3,
          { withCredentials: true }
        );
        console.log(res2);
        setStep(3);
      }
    } catch (error) {
      console.error("Error in signup:", error);
    }
  };

  // const confirmHandel=async ()=>{

  //   const data2={
  //     // email:savedEmail,
  //     username:usernameRef.current?.value,
  //     password:passwordRef.current?.value
  //   }
  //   console.log("ddd",data2);

  //   await axios.post("http://localhost:8000/cashflow/api/parent/signup/confirm/",data2).then(res=>{
  //     console.log("username and password",res);

  //   }).catch ((error)=>{
  //      console.log(error);

  //   })
  // }
  const navigate = useNavigate();

  const confirmHandel = async () => {
    const data2 = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    console.log("ddd", data2);

    try {
      const res = await axios.post(
        "http://localhost:8000/cashflow/api/parent/signup/confirm/",
        data2
      );
      console.log("username and password", res.data);
      setfinish(true);
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      // تمیز کردن تایمر هنگامUnmount کامپوننت
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);

      // if (error.response) {
      //   console.error("Server responded with error:", error.response.data);
      // } else if (error.request) {
      //   console.error("No response received:", error.request);
      // } else {
      //   console.error("Error setting up request:", error.message);
      // }
    }
  };
  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const [finish, setfinish] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" text-center place-items-center  h-full">
      {step == 1 && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            onClick={() => setIsOpen(true)}
            className="text-[#fca311] my-4  text-[30px] cursor-pointer"
            // className="block absolute my-4 left-[167px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaRegQuestionCircle></FaRegQuestionCircle>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white w-[400px] dark:bg-gray-700 rounded-lg shadow-lg  max-w-lg p-6">
            {/* Header with close button */}
            <div
              dir="rtl"
              className="flex justify-between  items-center mb-4 border-b border-gray-200 dark:border-gray-600 pb-2"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                نحوه ثبت نام
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="text-gray-600 dark:text-gray-300  space-y-3 text-sm leading-relaxed">
              <p>
                اگر به عنوان والد وارد سایت شده اید ابتدا ثبت نام کنید سپس در
                داشبورد خود فرزند یا فرزندانتان را عضو کنید
              </p>
              <p>
                اگر نوجوانی 12تا18 ساله هستید از والدین خود بخواهید برایتان حساب
                کاربری ایجاد کنند
              </p>
              <p>😉👍</p>
            </div>
          </div>
        </div>
      )}

      <div className="logo w-[270px] mt-20">
        <img src={logo} alt="" />
      </div>

      <div className="h-[60%]  grid gap-4  place-items-center">
        <p className="text-[#fca311] text-[15px] font-bold">ثبت نام</p>
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
              <div className="grid gap-15">
                <Input res={data[0]} ref={usernameRef} err={""}></Input>
                <Input res={data[2]} ref={passwordRef} err={""}></Input>
              </div>
            )}{" "}
          </motion.div>
        </AnimatePresence>

        {step == 1 && (
          <button
            type="submit"
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
