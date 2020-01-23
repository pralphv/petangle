import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles(theme => ({
  icon: {
    paddingRight: theme.spacing(1)
  },
  likeUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    height: 110,
  },
  likeLi: {
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      background: "#DFE0DF"
    },
  }
}));

export default function LikeButton({
  lOrDl,
  pets,
  value,
  handleOnClick,
  handleOnClickCancelLike,
  productId
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const iconMap = {
    l: ThumbUpIcon,
    dl: ThumbDownIcon
  };

  const Icon = iconMap[lOrDl];
  return (
    <div>
      <Typography>
        <IconButton
          aria-label="like"
          size="small"
          style={{ fontSize: 17 }}
          onClick={handleClick}
        >
          <Icon className={classes.icon} fontSize="inherit" /> {value}
        </IconButton>
      </Typography>
      {pets && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <ul className={classes.likeUl}>
            {Object.entries(pets).map(([key, value]) => {
              const alreadyLiked = value[`already_${lOrDl}`].has(productId);
              return (
                <li
                  className={classes.likeLi}
                  key={key}
                  onClick={() =>
                    alreadyLiked
                      ? handleOnClickCancelLike(key)
                      : handleOnClick(key)
                  }
                >
                  {alreadyLiked && (
                    <Icon className={classes.icon} fontSize="inherit" />
                  )}
                  {value.n}
                </li>
              );
            })}
          </ul>
        </Popover>
      )}
    </div>
  );
}
