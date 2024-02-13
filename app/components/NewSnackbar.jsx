import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({ variant, open }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      enqueueSnackbar('This is a success message!', { variant });
    }
  }, [open, enqueueSnackbar, variant]);

  // Return null as we don't render anything in this component
  return null;
}

export default function NewSnackbar({ variant }) {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp variant={variant} open={true} />
    </SnackbarProvider>
  );
}
