import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const CustomSuspense = ({ children }) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      {children}
    </Suspense>
  );
};

export default CustomSuspense;