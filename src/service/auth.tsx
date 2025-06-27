import api from "./api"

export const login=async (data:unknown)=>{
    return await api.post("login",data)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const costs = async (params: any) => {
    return await api.get("costs", { params });
  };
  