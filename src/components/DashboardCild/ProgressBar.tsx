// ProgressBar.tsx
import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';

interface ProgressBarProps {
  current: number;
  total: number;
  name: string;
}

const CustomLinearProgress = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
  backgroundColor: '#ffff',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#fca311',
    borderRadius: 5,
  },
});

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, name }) => {
  const percentage = (current / total) * 100;

  return (
    <Box
      sx={{
        // backgroundColor: '#3f3a34',
        padding: 2,
        borderRadius: 2,
        color: 'white',
        direction: 'rtl',
        width: 400,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 ,direction:"ltr"}}>
        <Typography variant="body2" sx={{ color: '#f7a100' }}>
          {current.toLocaleString()} / {total.toLocaleString()}
        </Typography>
        <Typography variant="body2">{name}</Typography>
      </Box>
      <CustomLinearProgress variant="determinate" value={percentage} />
    </Box>
  );
};

export default ProgressBar;
