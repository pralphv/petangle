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
  { icon: <PetsIcon />, name: "Add Pet" },
  { icon: <LocalDiningIcon />, name: "Add Product" }
];

export default function AddFAB() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
