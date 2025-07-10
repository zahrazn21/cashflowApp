import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { chartsTooltipClasses, useDrawingArea } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

export interface costType {
  id: number;
  amount: string;
  cate_choices: string;
  description: string;
  date: string;
  type: string;
  child: number;
}

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const StyledText = styled("text")(() => ({
  fill: "black",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

interface propType {
  amount: [number,string];
  centerBox:string
  category:string
}

export default function PieTrainChart({ amount, centerBox }: propType) {
    console.log("category:",centerBox);

  const desktopOS = [
    { label: `${100-amount[0]<0?"stack overflow":"خرج شده"}`, value: amount[0], color: amount[1] },
    // { label: "نیاز ها", value: amount, color: "#FCA311" },
    { label: "باقی مانده", value: 100-(amount[0]), color: "white" },
  ];
  
  // const valueFormatter = (item: { value: number }) => `${item.value}%`;
  const valueFormatter = (item: { value: number }) => `${100-amount[0]<0?`+${item.value}`:`${item.value}%`}`;

  return (
    <PieChart
      height={100}
      width={270}
      hideLegend
      margin={{ top: 0, left: 0, right: 0, bottom: 30 }}
      series={[
        {
          data: desktopOS,
          innerRadius: 70,
          outerRadius: 90,
          cornerRadius: 0,
          valueFormatter,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 70, additionalRadius: -10, color: "gray" },
          
        },
      ]}
      sx={{
        "& path": {
          stroke: "none", 
          stopColor:"black",
        },
      }}
    
      slotProps={{
        tooltip: {
          sx: {
            [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]: {
              color: `${100-amount[0]<0 ? "red":"black"}`,
            },
          },
        },
        legend: {
          direction: "vertical",
          position: {
            vertical: "middle",
            horizontal: "center",
          },
          sx: {
            direction: "rtl",
          },
        },
      }}

    >
      
      <PieCenterLabel>
        {centerBox}
      </PieCenterLabel>
      
        <Box
        position="absolute"
        top="60%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}
        >
          
        </Typography>
    
      </Box>
   
    </PieChart>
  );
  
}
