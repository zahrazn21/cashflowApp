import 'react'
import logo from "../assets/image/logo.png"
import { Link } from 'react-router-dom'
export default function StartPage() {
  return (
    <div className='gap-2 grid place-content-center w-full h-full bg-linear-to-t/srgb from-gray-600 from-[00%] to-white to-[100%] via-70% via-white'>
     <div className='place-items-center '>
     <img className='w-[277px] content-center' src={logo} alt="" />
     </div>
     <Link to={"/LoginPage"}>
     <div className="start hover:drop-shadow-lg hover:drop-shadow-[#ffffff] text-black text-center cursor-pointer ">
        <p>ورود به حساب کاربری</p>
     </div>
     </Link>

     <div className="flex justify-center " dir='rtl'>
        <span>
        حساب کاربری ندارید؟  
        </span>
        <Link to={"/rigester"}>
        <span className='text-[#8c5900] cursor-pointer'>
            ثبت نام در کش فلو
        </span>
        </Link>

     </div>
    </div>
  )
}
