import 'react'
import { useState } from 'react'
import ProgressBar from './ProgressBar'

interface propType{
    savings:number
    goal_amount:number
    goal:string
}
export default function GoalsBox({savings,goal_amount,goal}:propType) {
    
      const [editClick,setEditClick]=useState(false)
      const showEdit=()=>{
        if(!editClick){
        setEditClick(true)
        }else{
        setEditClick(false)
        }
      }
  return (
    <div dir="rtl" className="flex  my-7 select-none bg-[#F9D87617]  w-full items-center justify-around text-white">
                    <li >
                      <ProgressBar
                        current={savings}
                        total={goal_amount}
                        name={goal}
                      ></ProgressBar>
                    </li>
                    <p onClick={showEdit}>dc</p>
                    {editClick&&
                    <div className='w-[400px] h-[300px]  top-[5%] fixed bg-white rounded-[15px]'>ggg</div>
                    }
        </div>
  )
}
