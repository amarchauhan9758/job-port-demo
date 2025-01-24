import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

function Loader({ openLoader }) {
  const [imageError, setImageError] = useState(false);
  return (
    <Box>
      <Dialog
        open={openLoader}
        className="loaderWrap"
        style={{ zIndex: "9999" }}
      >
        <DialogContent className="loader-content">
          <Box className="text-center">
            {!imageError ? (
              <img
                src="https://media.giphy.com/media/YMM6g7x45coCKdrDoj/giphy.gif"
                alt="Loader"
                width={150}
                height={100}
                onError={() => setImageError(true)} // Trigger fallback on error
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
export default Loader;
