
const handelError=(data:{email:string|undefined,password:string|undefined})=>{
    const newErrors: {
        email: string;
        password: string;
  
      } = {
        email:"",
        password:""
      }; 
       for(const [key,value] of Object.entries(data)){
        if(!value){
          switch(key){
            case "email":
              newErrors[key as keyof typeof newErrors]="ایمیل نباید خالی باشد"
            break;
            case "password":
              newErrors[key as keyof typeof newErrors]="رمز عبور نباید خالی باشد"
            break;
          }
        }
      }
    //   const hasErrors = Object.values(newErrors).some(value => value !== "");
 

      return newErrors

}

export default handelError