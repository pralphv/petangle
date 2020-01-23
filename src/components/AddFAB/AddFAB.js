import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";
import LocalDiningIcon from "@material-ui/icons/LocalDining";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2)
  }
}));

const actions = [
  { icon: <PetsIcon />, name: "Add Pet", to: "/add-pet" },
  { icon: <LocalDiningIcon />, name: "Add Product", to: "/add-product" }
];

export default function AddFAB({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOnClick(to) {
    history.push(to);
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleOnClick(action.to)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
