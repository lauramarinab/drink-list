import * as React from "react";
import { Snackbar, Typography } from "@material-ui/core";

interface Props {
  open: boolean;
  handleClose: () => void;
  text: string | JSX.Element;
}

const NotificationSnackbar: React.FC<Props> = ({ open, handleClose, text }) => {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ background: "var(--primary)", borderRadius: 15, padding: "10px 20px", color: "#fff" }}>
        <Typography variant="subtitle2">{text}</Typography>
      </div>
    </Snackbar>
  );
};

export { NotificationSnackbar };
