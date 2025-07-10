import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts";
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
  fill: "white",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

interface propType {
  amount?: number[]|undefined;
  width: number;
  sum?:number
}

export default function Chart({ amount }: propType) {
  const desktopOS = [
  { label: "نیاز ها", value: amount?.[1] ?? 0, color: "#FCA311" },
  { label: "خواسته ها", value: amount?.[0] ?? 0, color: "#8C1C13" },
  { label: "سایر", value: amount?.[2] ?? 0, color: "#FFEE32" },
];


  const valueFormatter = (item: { value: number }) => `${item.value}%`;

  return (
    <PieChart
      height={200}
      margin={{ top: 20, left: 0, right: 10, bottom: 20 }}
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
          stroke: "none", // حذف بوردر سفید
        },
      }}
      slotProps={{
        legend: {
          direction: "vertical",
          position: {
            vertical: "middle",
            horizontal: "center",
          },
          sx: {
            color: "white",
            direction: "rtl",
          },
        },
      }}
    >
      
      <PieCenterLabel>
         هزینه ها
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
