import 'react'
import { forwardRef } from 'react'
interface type{
    res:{
        title:string
        type:string
    }
value?: string | number
}
const InputCost = forwardRef<HTMLInputElement, type>(({ res }, ref) => {
  return (
    <div className='my-1 rounded-[10px] drop-shadow-lg/20' dir='rtl'>
    <input   ref={ref} className='bg-white w-[228px] px-2 text-[10px] outline-none  border-1 rounded-[10px] h-[25px]  placeholder-[#fca311] border-[#D9D9D9]' placeholder={res.title}/>
      
    </div>
  )
}
)
export default InputCost
