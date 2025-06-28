/* eslint-disable react-hooks/exhaustive-deps */
import "react";
import api from "../service/api";
import {  useEffect, useState } from "react";
import DetailBox from "../components/Details/DetailBox";
import { useAppContext } from "../components/ui/AppContext";
export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}


export default function DetailsPage() {
  const childToken = localStorage.getItem("child_token_");
  const [datacost, setdatacost] = useState<costType[]>([]);
  const {setCategory2}=useAppContext()

  useEffect(() => {
    detailRequest();
  }, []);

  useEffect(() => {
    if (datacost) {
      setCategory();
    }
  }, [datacost]);

  const detailRequest = async () => {
    try {
      const res = await api.get("costs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${childToken}`,
        },
      });
       console.log("result cost", res);

      console.log("data cost", res.data);
      
      setdatacost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [wants, setwants] = useState<costType[]>([]);
  const [needs, setNeeds] = useState<costType[]>([]);
  const [Else, setElse] = useState<costType[]>([]);

  const setCategory = () => {
    const filteredWants = datacost.filter(
      (res) => res.cate_choices === "wants"
    );
    const filteredNeeds = datacost.filter(
      (res) => res.cate_choices === "needs"
    );
    const filteredElse = datacost.filter((res) => res.cate_choices === "else");

    setwants(filteredWants);
    setNeeds(filteredNeeds);
    setElse(filteredElse);
  };

  console.log("category", wants, needs, Else);

  const [PercentageWants, setPercentageWants] = useState(0);
  const [PercentageNeeds, setPercentageNeeds] = useState(0);
  const [PercentageElse, setPercentageElse] = useState(0);

  // const [openBox,setOpenBox]=useState("")
  const Percentage = () => {
    const PercentageToTal = datacost.map((res) => parseInt(res.amount));
    const sum = PercentageToTal.reduce((acc, curr) => acc + curr, 0);
    const amountTotalWants = wants.map((res) => parseInt(res.amount));
    const amountTotalNeeds = needs.map((res) => parseInt(res.amount));
    const amountTotalElse = Else.map((res) => parseInt(res.amount));

    setPercentageWants(
      Number(
        (
          (amountTotalWants.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );
    setPercentageNeeds(
      Number(
        (
          (amountTotalNeeds.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );
    setPercentageElse(
      Number(
        (
          (amountTotalElse.reduce((acc, curr) => acc + curr, 0) / sum) *
          100
        ).toFixed(2)
      )
    );



  };


  useEffect(() => {
    if (wants.length || needs.length || Else.length) {
      Percentage();
    }
  }, [wants, needs, Else]);


  useEffect(() => {
    setCategory2([PercentageWants,PercentageNeeds,PercentageElse])
  }, [PercentageWants,PercentageNeeds,PercentageElse]);
  

  return (
    <div className="[&::-webkit-scrollbar]:w-0 h-full overflow-y-auto place-items-center content-center py-2">
      {needs && (
        <DetailBox
          Percentage={PercentageNeeds}
          name="نیاز ها"
          detailRequest={needs}
        />
      )}
      {wants && (
        <DetailBox
          Percentage={PercentageWants}
          name="خواسته ها"
          detailRequest={wants}
        />
      )}
      {Else && (
        <DetailBox
          Percentage={PercentageElse}
          name="سایر موارد"
          detailRequest={Else}
        />
      )}

      {/* {Else && <DetailBox isOpen={openBox==="else"} onClick={()=>setOpenBox("else")} name="سایر موارد" detailRequest={Else} />} */}

      
    </div>
  );
}
