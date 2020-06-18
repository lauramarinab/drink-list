import * as React from "react";
import { Snackbar, Typography } from "@material-ui/core";
import { somethingWentWrong } from "../../utils/messages";

const ErrorSnackbar: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ background: "var(--secondary)", borderRadius: 15, padding: "10px 20px", color: "#fff" }}>
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          {somethingWentWrong}
        </Typography>
      </div>
    </Snackbar>
  );
};

export { ErrorSnackbar };
