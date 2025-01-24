import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function ApiErrorMessage({ openApiError, setOpenApiError, errorMessage }) {
  const handleCloseOne = () => {
    setOpenApiError(false);
  };
  return (
    <Box>
      <Dialog
        open={openApiError}
        onClose={() => handleCloseOne()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleCloseOne(e)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ApiErrorMessage;
