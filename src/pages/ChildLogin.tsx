import "react";
import logo from "../../src/assets/image/logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import api from "../service/api";
import handelError from "../components/ui/handelErrorLogin";
import { AxiosError } from "axios";
import FinishBox from "../components/ui/finishBox";

const data = [
  { title: "ایمیل", icon: "", type: "text" },
  { title: "رمز عبور", icon: "", type: "password" },
];

export default function ChildLogin() {
  const [serverError, serServerError] = useState("");
  const [error, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [finish, setFinish] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const loginUseHandel = async () => {
    serServerError("");
    const data = {
      email: emailRef.current?.value,
      password: passRef.current?.value,
    };
    const funcError = handelError(data);
    setError({ email: "", password: "" });
    const hasErrors = Object.values(funcError).some((value) => value !== "");
    if (hasErrors) {
      setError(funcError);
    }

    try {
      if (!hasErrors) {
        const res = await api.post("child/login/", data);
        console.log("resLogin", res.data);
        setError(res.data.message);
        setToken(res.data.token);
        localStorage.setItem("child_token_", res.data.token);
        setFinish(true);
        const timer = setTimeout(() => {
          navigate("/dashboardChild");
        }, 3000);

        return () => clearTimeout(timer);
      }

    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as AxiosError<any>;

      if (error.response) {
        console.log("Server error:", error.response.data);

        const data = error.response.data;

        if (data.email) {
          serServerError(data.email);
        } else if (data.non_field_errors) {
          serServerError(data.non_field_errors);
        } else {
          serServerError(data.error);
        }
      } else if (error.request) {
        console.log("No response received:", error.request);
        serServerError(error.request.non_field_errors);
      } else {
        console.log("Error:", error.message);
        serServerError(error.message);
      }
    }
  };
  console.log("token", token);
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        loginUseHandel();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" text-center place-items-center  h-full">
      <div className="logo w-[270px] mt-20">
        <img src={logo} alt="" />
      </div>
      <div className="h-[60%]  grid gap-4  place-items-center">
        <p className="text-[#fca311]"> ورود فرزند</p>

        <Input res={data[0]} ref={emailRef} err={error.email}></Input>
        <Input res={data[1]} ref={passRef} err={error.password}></Input>

        <button
          onClick={loginUseHandel}
          className="w-[116px]  h-[40px] text-[15px] font-bold rounded-[18px] bg-[#fca311]"
        >
          ورود
        </button>
      </div>
      {serverError && <div className="text-red-500">{serverError}</div>}
      {finish && <FinishBox title="ورود با موفقیت انجام شد"></FinishBox>}
    </div>
  );
}
