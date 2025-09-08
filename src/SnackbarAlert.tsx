import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, onClose, message }) => (
  <Snackbar 
    open={open} 
    autoHideDuration={3000} 
    onClose={onClose} 
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity="info" sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
