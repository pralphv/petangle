import React from "react";
import PropTypes from "prop-types";

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
  {
    icon: <PetsIcon />,
    name: { en: "Add Pet", zh: "加寵物", jp: "ペットを追加する" },
    to: "/add-pet"
  },
  {
    icon: <LocalDiningIcon />,
    name: { en: "Submit Product", zh: "提交產品", jp: "製品を提出する" },
    to: "/add-product"
  }
];

export default function AddFAB({ history, locale }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOnClick(to) {
    to = locale ? `/${locale}${to}` : to;
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
            key={action.name.en}
            icon={action.icon}
            tooltipTitle={action.name[locale]}
            onClick={() => handleOnClick(action.to)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

AddFAB.propTypes = {
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};
