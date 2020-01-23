import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FlagIcon from "@material-ui/icons/Flag";
import Modal from "@material-ui/core/Modal";
import { Input } from "@material-ui/core";
import { CustomButton } from "..";

// const actions = [
//   { icon: <PetsIcon />, name: "Add Pet" },
//   { icon: <LocalDiningIcon />, name: "Add Product" }
// ];
const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    width: "70%",
    transform: "translate(-50%, -50%)"
  }
}));

export default function ReportButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        <IconButton
          onClick={handleOpen}
          aria-label="save"
          size="small"
          style={{ fontSize: 17 }}
        >
          <FlagIcon /> Report
        </IconButton>
      </Typography>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography>
            Thank you for helping us keep our database correct!
          </Typography>
          <br />
          <Typography>
            If you think there is anything wrong or needs updating for this
            product's data, please press "Submit". We will check and do the
            corrections.
          </Typography>
          <br />
          <Typography>
            We hate to bother you further, but it would be great if you could
            also provide a link to this product's official website!
          </Typography>
          <form >
            <div>
              <Input placeholder="Link" type="text" autoComplete="off" />
              <br />
              <br />
              <div className={"report-button-container "}>
                <CustomButton text="Submit"/>
              </div>
            </div>
          </form>

        </div>
      </Modal>
    </div>
  );
}
