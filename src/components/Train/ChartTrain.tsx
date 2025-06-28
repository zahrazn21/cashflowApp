import "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";

interface type{
  wants:number
  needs:number
  others:number
}
interface amountsType{
  data:type
}
export default function ChartTrain({data}:amountsType) {
  console.log("others chart",data.others);
  
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: data.wants, label: "خواسته ها", color: "#A9A9A9"  },
            { id: 1, value: data.needs, label: "نیازها", color: "#353535" },
            { id: 2, value: data.others, label: "سایر", color: "#FCA311" },
          ],
          
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 30,

          arcLabelRadius: '60%',
        
        
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold',
          // color:"white",
          fill:"white",
          fontSize:"12px",
          textAlign:"center",
        },
      }}
      slotProps={{
        // legend: { hidden: true },
      }}
      hideLegend
      width={200}
      height={150}
    />
  );
}
