import  'react'
import { forwardRef, ReactNode, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

interface type{
    res:{
        icon:ReactNode
        title:string
        type:string
    }
    err?:string
}


const Input = forwardRef<HTMLInputElement, type>(({ res,err }, ref) => {

  const [check,setCheck]=useState(false)
  const clickHandler=()=>{
     if(!check){
      setCheck(true)
     }else{
      setCheck(false)
     }

  }
  return (
    <div>
      <div className="flex items-end " dir='rtl'>
      <span className="text-[30px] text-[#fca311] ml-1">{res.icon}</span>
        <div dir="rtl" className="w-[267px] flex items-center border-b-2 border-black">
        
            <input
            ref={ref}
              type={res.type==="text"?"text":check?"text":"password"}
              className="w-full bg-blend- bg-transparent font-display border-transparent focus:outline-none ring-0  outline-none"
              placeholder={res.title}
            />
              {res.type==="password" && 
          <div onClick={clickHandler}>
             {check ?  <FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>}
          </div>
         }
            
          </div>
      </div>
       
          <div className='text-red-600'>{err}</div>
    </div>
  )
}
)
export default Input