import "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Box, Typography } from "@mui/material";


interface propsType {
  goal: string;
  goal_amount: number;
  id: number;
  savings: number;
}
interface type{
  res:propsType
}
export default function GaugeChart({res}:type) {
  const settings = {
  width: 150,
  height: 150,
  color:"white",
  value:(res.savings/res.goal_amount)*100,
};
  return (
    <Box position="relative" width={150} height={150}>
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={() => ({
          // [`& .${gaugeClasses.valueText}`]: {
          //   fontSize: 40,
          //   fill: "white",
          // },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#fca311",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: "white",
          },
        })}
      />
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
          {res.goal}
        </Typography>
      
      </Box>
      {/* <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(300%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}
        >
          %
        </Typography>
      </Box> */}
    </Box>
  );
}
